import cron from 'node-cron';
import * as brightstoreService from './src/services/brightstoresService.js';
import * as gainsightService from './src/services/gainsightService.js';

const syncGainsightPointsToBrightstores = async () => {
  let page = 1;
  const perPage = 50; // Adjust per page size if needed
  let hasMorePages = true;

  console.log('Starting Gainsight to Brightstores sync job...');

  try {
    while (hasMorePages) {
      // Step 1: Fetch Brightstores users (paginate)
      const brightstoreUsers = await brightstoreService.getBrightstoreUsers(page, perPage);
      if (!brightstoreUsers?.users || brightstoreUsers?.users?.length === 0) {
        console.log(`No users found on page ${page}. Ending job.`);
        break;
      }

      console.log(`Processing ${brightstoreUsers?.users?.length} users from Brightstores page ${page}...`);

      const { users } = brightstoreUsers;
      for (const brightUser of users) {
        const { email, id: brightstoreUserId } = brightUser;

        try {
          // Step 2: Find Gainsight user by email
          const gainsightUser = await gainsightService.fetchUserByFieldValue('email', email);

          if (!gainsightUser) {
            console.warn(`No Gainsight user found for email: ${email}`);
            continue;
          }

          // Step 3: Fetch Gainsight user's points
          const gainsightPoints = await gainsightService.fetchGainsightPointsByUserIds([gainsightUser.userid]);

          if (!gainsightPoints || gainsightPoints.length === 0) {
            console.warn(`No points found for Gainsight user with email: ${email}`);
            continue;
          }

          const userPoints = gainsightPoints[0].points; // Adjust based on API response structure

          // Step 4: Update Brightstores user balance
          await brightstoreService.updateBrightstoreUsers(brightstoreUserId, userPoints);
          console.log(`Updated Brightstores user ${brightstoreUserId} with ${userPoints} points.`);
        } catch (error) {
          console.error(`Error processing user ${email}:`, error.message);
        }
      }

      // Step 5: Move to the next page
      page++;
      console.log(`Moving to Brightstores page ${page}...`);
    }

    console.log('Cron job completed successfully.');
  } catch (error) {
    console.error('Error in cron job:', error.message);
  }
};

const registerMissingUsers = async () => {
  console.log('Starting registration of missing Gainsight users in Brightstores...');

  try {
    let page = 1;
    const perPage = 50;
    let hasMorePages = true;

    while (hasMorePages) {
      // Fetch Gainsight users
      const gainsightUsers = await gainsightService.fetchGainsightUsers(page, perPage);
      const users = Object.assign({}, gainsightUsers);
      delete users.statistics;

      if (!users || Object.keys(users).length === 0) break;

      console.log(`Checking ${Object.keys(users).length} Gainsight users from page ${page}...`);
      console.log(Object.values(users));
      for(const gainsightUser of Object.values(users)) {
        try {
          console.log(`Registering new Brightstores user: ${gainsightUser.email}`);

          const newBrightstoresUser = {
            user: {
              username: gainsightUser.username,
              email: gainsightUser.email,
              first_name: "user",
              last_name: page.toString(),
              active: true,
            }
          };

          await brightstoreService.createBrightstoreUsers(newBrightstoresUser);
          console.log(`Successfully registered ${gainsightUser.email} in Brightstores.`);
        } catch (error) {
          console.error(`Error checking/registering user ${gainsightUser.email}:`, error.message);
        }
      }

      page++;
    }

    console.log('Registration job completed.');
  } catch (error) {
    console.error('Error in user registration job:', error.message);
  }
};

// Schedule the cron job to run every Friday at midnight
cron.schedule('0 0 * * 5', () => {
  console.log('Cron job is running for missing users')
  registerMissingUsers();
});
cron.schedule('0 3 * * 5', () => {
  console.log('Cron job is running for sync the points of users')
  syncGainsightPointsToBrightstores();
});

export {
  syncGainsightPointsToBrightstores,
  registerMissingUsers
};
