/**
 * StorageService - Manages persistent data storage using localStorage
 * Safely handles server-side rendering (SSR) by checking for window object.
 */

const STORAGE_KEYS = {
  USER: 'gramsaarthi_user',
  USER_PROFILE: 'gramsaarthi_user_profile',
  ELIGIBILITY_DATA: 'gramsaarthi_eligibility_data',
  SAVED_SCHEMES: 'gramsaarthi_saved_schemes',
  APPLIED_SCHEMES: 'gramsaarthi_applied_schemes'
};

// Helper to safely access localStorage
const safeStorage = {
  getItem: (key) => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  },
  setItem: (key, value) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  },
  removeItem: (key) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }
};

const StorageService = {
  // User Authentication
  setUser(user) {
    safeStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  getUser() {
    const user = safeStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  },

  clearUser() {
    safeStorage.removeItem(STORAGE_KEYS.USER);
  },

  // User Profile Data
  setUserProfile(profile) {
    safeStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  },

  getUserProfile() {
    const profile = safeStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    return profile ? JSON.parse(profile) : null;
  },

  clearUserProfile() {
    safeStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
  },

  // Eligibility Data
  setEligibilityData(data) {
    safeStorage.setItem(STORAGE_KEYS.ELIGIBILITY_DATA, JSON.stringify(data));
  },

  getEligibilityData() {
    const data = safeStorage.getItem(STORAGE_KEYS.ELIGIBILITY_DATA);
    return data ? JSON.parse(data) : null;
  },

  clearEligibilityData() {
    safeStorage.removeItem(STORAGE_KEYS.ELIGIBILITY_DATA);
  },

  // Saved Schemes
  addSavedScheme(schemeId) {
    const saved = this.getSavedSchemes();
    if (!saved.includes(schemeId)) {
      saved.push(schemeId);
      safeStorage.setItem(STORAGE_KEYS.SAVED_SCHEMES, JSON.stringify(saved));
    }
  },

  removeSavedScheme(schemeId) {
    const saved = this.getSavedSchemes();
    const filtered = saved.filter(id => id !== schemeId);
    safeStorage.setItem(STORAGE_KEYS.SAVED_SCHEMES, JSON.stringify(filtered));
  },

  getSavedSchemes() {
    const saved = safeStorage.getItem(STORAGE_KEYS.SAVED_SCHEMES);
    return saved ? JSON.parse(saved) : [];
  },

  isSchemeSaved(schemeId) {
    return this.getSavedSchemes().includes(schemeId);
  },

  // Applied Schemes
  addAppliedScheme(schemeId, applicationData) {
    const applied = this.getAppliedSchemes();
    const existingIndex = applied.findIndex(app => app.schemeId === schemeId);
    
    if (existingIndex > -1) {
      applied[existingIndex] = { schemeId, ...applicationData, appliedAt: new Date().toISOString() };
    } else {
      applied.push({ schemeId, ...applicationData, appliedAt: new Date().toISOString() });
    }
    
    safeStorage.setItem(STORAGE_KEYS.APPLIED_SCHEMES, JSON.stringify(applied));
  },

  removeAppliedScheme(schemeId) {
    const applied = this.getAppliedSchemes();
    const filtered = applied.filter(app => app.schemeId !== schemeId);
    safeStorage.setItem(STORAGE_KEYS.APPLIED_SCHEMES, JSON.stringify(filtered));
  },

  getAppliedSchemes() {
    const applied = safeStorage.getItem(STORAGE_KEYS.APPLIED_SCHEMES);
    return applied ? JSON.parse(applied) : [];
  },

  isSchemeApplied(schemeId) {
    return this.getAppliedSchemes().some(app => app.schemeId === schemeId);
  },

  getSchemeApplicationStatus(schemeId) {
    const applied = this.getAppliedSchemes();
    const application = applied.find(app => app.schemeId === schemeId);
    return application ? application.status || 'pending' : null;
  },

  // Clear all data
  clearAll() {
    Object.values(STORAGE_KEYS).forEach(key => {
      safeStorage.removeItem(key);
    });
  }
};

export default StorageService;
