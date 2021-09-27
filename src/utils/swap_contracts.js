import { swap_contracts } from "../declarations/swap_contracts/index";

export async function isOwnedOrReservable(token) {
  const list = await swap_contracts.getReservationAvailability(token);
  if (list) {
    return list;
  } else {
    return null;
  }
}

export async function requestReservation(token) {
  const list = await swap_contracts.requestReservation(token);
  if (list) {
    return list;
  } else {
    return null;
  }
}

export async function makeOffer(offer) {
  const list = await swap_contracts.makeOffer(offer);
  return list;
}

export async function executeSalesOrder(payload) {
  const list = await swap_contracts.executeSalesOrder(payload);
  return list;
}
