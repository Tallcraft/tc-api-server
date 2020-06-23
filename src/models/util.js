module.exports = {
  /**
   * Converts UUID without dashes to valid UUID
   * @param {String} uuid - UUID string without dashes.
   * @returns {string|null} - Valid UUID or null if input UUID has invalid format.
   */
  fixUpUUID(uuid) {
    const i = uuid;
    try {
      return `${i.substr(0, 8)}-${i.substr(8, 4)}-${i.substr(12, 4)}-${i.substr(16, 4)}-${i.substr(20)}`;
    } catch (error) {
      return null;
    }
  },

  /**
 * Converts a UUID to a string representation without dashes.
 * @param {String} uuid - Valid UUIDv4.
 * @returns {string|null} - String representation of UUID without dashes, or null if input null.
 */
  stripUUID(uuid) {
    if (!uuid) {
      return null;
    }
    return uuid.replace(/[^a-zA-Z0-9]/g, '');
  },

  /**
   * Checks if a UUID is defined and is not the null uuid (only 0)
   * @param {String} uuid - The UUID to check.
   * @returns {boolean} - True if UUID is null UUID, false otherwise.
   */
  isNullUUID(uuid) {
    return !uuid || Array.from(uuid).every((c) => c === '-' || c === '0');
  },
};
