import { post } from 'aws-amplify/api';
// import { get } from 'aws-amplify/api';

export async function postSchedule() {
  try {
    const restOperation = post({
      apiName: 'scheduleApi',
      path: '/schedule',
    });

    const { body } = await restOperation.response;
    const response = await body.json();

    console.log('POST call succeeded:', await restOperation.response);
    console.log(response);
  } catch (e) {
    if (e instanceof Error && 'response' in e && typeof (e as any).response === 'object' && (e as any).response.body) {
      console.log('POST call failed: ', JSON.parse((e as any).response.body));
    } else {
      console.log('POST call failed: ', e);
    }
  }
}

// export async function getSchedule() {
//   try {
//     const restOperation = get({
//       apiName: 'scheduleApi',
//       path: '/schedule'
//     });
//     const response = await restOperation.response;
//     console.log('GET call succeeded: ', response);
//   } catch (e) {
//     if (e instanceof Error && 'response' in e && typeof (e as any).response === 'object' && (e as any).response.body) {
//       console.log('GET call failed: ', JSON.parse((e as any).response.body));
//     } else {
//       console.log('GET call failed: ', e);
//     }
//   }
// }
