/**
 * StorageService - Manages persistent data storage using localStorage
 */

const STORAGE_KEYS = {
  USER: 'gramsaarthi_user',
  USER_PROFILE: 'gramsaarthi_user_profile',
  ELIGIBILITY_DATA: 'gramsaarthi_eligibility_data',
  SAVED_SCHEMES: 'gramsaarthi_saved_schemes',
  APPLIED_SCHEMES: 'gramsaarthi_applied_schemes'
};

export const StorageService = {
  // User Authentication
  setUser(user: any) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    }
  },

  getUser() {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem(STORAGE_KEYS.USER);
      return user ? JSON.parse(user) : null;
    }
    return null;
  },

  clearUser() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  },

  // User Profile Data
  setUserProfile(profile: any) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    }
  },

  getUserProfile() {
    if (typeof window !== 'undefined') {
      const profile = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      return profile ? JSON.parse(profile) : null;
    }
    return null;
  },

  clearUserProfile() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
    }
  },

  // Eligibility Data
  setEligibilityData(data: any) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.ELIGIBILITY_DATA, JSON.stringify(data));
    }
  },

  getEligibilityData() {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(STORAGE_KEYS.ELIGIBILITY_DATA);
      return data ? JSON.parse(data) : null;
    }
    return null;
  },

  clearEligibilityData() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.ELIGIBILITY_DATA);
    }
  },

  // Saved Schemes
  addSavedScheme(schemeId: string) {
    const saved = this.getSavedSchemes();
    if (!saved.includes(schemeId)) {
      saved.push(schemeId);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.SAVED_SCHEMES, JSON.stringify(saved));
      }
    }
  },

  removeSavedScheme(schemeId: string) {
    const saved = this.getSavedSchemes();
    const filtered = saved.filter((id: string) => id !== schemeId);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.SAVED_SCHEMES, JSON.stringify(filtered));
    }
  },

  getSavedSchemes() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.SAVED_SCHEMES);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  },

  isSchemeSaved(schemeId: string) {
    return this.getSavedSchemes().includes(schemeId);
  },

  // Applied Schemes
  addAppliedScheme(schemeId: string, applicationData: any) {
    const applied = this.getAppliedSchemes();
    const existingIndex = applied.findIndex((app: any) => app.schemeId === schemeId);
    
    if (existingIndex > -1) {
      applied[existingIndex] = { schemeId, ...applicationData, appliedAt: new Date().toISOString() };
    } else {
      applied.push({ schemeId, ...applicationData, appliedAt: new Date().toISOString() });
    }
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.APPLIED_SCHEMES, JSON.stringify(applied));
    }
  },

  removeAppliedScheme(schemeId: string) {
    const applied = this.getAppliedSchemes();
    const filtered = applied.filter((app: any) => app.schemeId !== schemeId);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.APPLIED_SCHEMES, JSON.stringify(filtered));
    }
  },

  getAppliedSchemes() {
    if (typeof window !== 'undefined') {
      const applied = localStorage.getItem(STORAGE_KEYS.APPLIED_SCHEMES);
      return applied ? JSON.parse(applied) : [];
    }
    return [];
  },

  isSchemeApplied(schemeId: string) {
    return this.getAppliedSchemes().some((app: any) => app.schemeId === schemeId);
  },

  getSchemeApplicationStatus(schemeId: string) {
    const applied = this.getAppliedSchemes();
    const application = applied.find((app: any) => app.schemeId === schemeId);
    return application ? application.status || 'pending' : null;
  },

  // Clear all data
  clearAll() {
    if (typeof window !== 'undefined') {
      Object.values(STORAGE_KEYS).forEach((key) => {
        localStorage.removeItem(key);
      });
    }
  }
};
