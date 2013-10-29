<?php
/**
 * @file
 * Hooks provided by ding_reservation module.
 */

/**
 * Notify modules when an item was reserved.
 *
 * @param DingReservationReservableEntity $reservable
 *   Item reserved.
 */
function hook_ding_reservation_complete($reservable) {

}

/**
 * Notify modules when reservations were deleted.
 *
 * @param array $ids
 *    Entity IDs.
 */
function hook_ding_reservation_deleted($ids) {

}
