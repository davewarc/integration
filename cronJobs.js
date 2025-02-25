import cron from 'node-cron';
import * as brightstoreService from './src/services/brightstoresService.js';
import * as gainsightService from './src/services/gainsightService.js';
import * as deposcoService from './src/services/deposcoService.js';

const mapBrightstoreToDeposco = (order) => {
  // Convert Brightstore order to Deposco order format
  return {
    order: [
      {
        businessUnit: 'BECM', // Adjust as needed
        number: `SO${order.order_id}`,
        type: 'Sales Order',
        status: 'New',
        orderPriority: '10', // Adjust priority if needed
        shipToAddress: {
          name: `${order.shipping_contact.first_name} ${order.shipping_contact.last_name}`,
          contactName: `${order.shipping_contact.first_name} ${order.shipping_contact.last_name}`,
          email: order.shipping_contact.email,
          phone: order.shipping_contact.phone,
          addressLine1: order.shipping_address.first_address,
          city: order.shipping_address.city,
          stateProvinceCode: order.shipping_address.state,
          postalCode: order.shipping_address.zip,
          countryCode: order.shipping_address.country,
        },
        orderLines: order.line_items.map((item, index) => ({
          lineNumber: (index + 1).toString(),
          itemNumber: item.final_sku, // Assuming this is the correct item number for Deposco
          quantity: item.quantity.toString(),
          packKey: `${item.final_sku}--Each--${item.quantity}`,
          unitPrice: parseFloat(item.unit_price),
        })),
      },
    ],
  };
};

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

const pushOrderFromBrightstoresToDeposco = async () => {
  let page = 1;
  const perPage = 50; // Adjust as needed
  let totalOrders = [];

  while (true) {
    const result = await brightstoreService.getBrightOrders(page, perPage);
    if (result.orders.length === 0) break;
    totalOrders = [...totalOrders, ...result.orders];
    page++;
  }
  console.log(`Fetched ${totalOrders.length} orders from Brightstores`);

  try {
    console.log('Cron job started: Fetching orders from Brightstores...');

    // Process each order
    for (const order of totalOrders) {
      try {
        // Get full order details by ID
        const orderDetails = await brightstoreService.getBrightOrderById(order.order_id);
        console.log(`Fetched order details for order ID: ${order.order_id}`);
        // Map the Brightstore order details to Deposco request format
        const deposcoOrder = mapBrightstoreToDeposco(orderDetails);
        console.log('----------deposcoOrder------');
        console.log(deposcoOrder);
        console.log(deposcoOrder.order?.[0]?.shipToAddress);
        console.log(deposcoOrder.order?.[0]?.orderLines);
        // Push the order to Deposco
        const response = await deposcoService.createDeposcoNewOrder(deposcoOrder);
        console.log(`Order ID ${order.order_id} pushed to Deposco:`, response);
      } catch (error) {
        console.error(`Error processing order ID ${order.order_id}:`, error.message);
      }
    }
    console.log('Cron job completed successfully');
  } catch (error) {
    console.error('Error fetching orders from Brightstores:', error.message);
  }
}

// Schedule the cron job to run every Friday at midnight
cron.schedule('0 0 * * 5', () => {
  console.log('Cron job is running for sync the points of users')
  syncGainsightPointsToBrightstores();
});

// Schedule the cron job to run every Friday at midnight
cron.schedule('0 3 * * 5', () => {
  console.log('Cron job is running for sync the points of users')
  pushOrderFromBrightstoresToDeposco();
});

export {
  syncGainsightPointsToBrightstores,
  pushOrderFromBrightstoresToDeposco,
};
