
import type { User, PlanTier } from '../types';

// STORAGE KEYS
const USERS_KEY = 'vh_users';
const CURRENT_USER_KEY = 'vh_current_user';

// INITIAL SEED DATA (For Admin Access)
const SEED_ADMIN: User = {
  id: 'admin-1',
  name: 'Admin User',
  email: 'admin@valuehub.com',
  role: 'admin',
  plan: 'Enterprise',
  joinedAt: new Date().toISOString(),
  subscriptionStatus: 'active'
};

// HELPER: Get all users
const getAllUsersFromStorage = (): User[] => {
  const stored = localStorage.getItem(USERS_KEY);
  if (!stored) {
    localStorage.setItem(USERS_KEY, JSON.stringify([SEED_ADMIN]));
    return [SEED_ADMIN];
  }
  return JSON.parse(stored);
};

// HELPER: Save users
const saveUsersToStorage = (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const api = {
  // AUTHENTICATION
  login: async (email: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getAllUsersFromStorage();
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        
        if (user) {
          localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
          resolve(user);
        } else {
          // Auto-register for demo purposes if not found, or reject
          // For this demo, we will auto-create a user to make testing easier
          const newUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            name: email.split('@')[0],
            email,
            role: 'user',
            plan: 'Free',
            joinedAt: new Date().toISOString(),
            subscriptionStatus: 'active'
          };
          users.push(newUser);
          saveUsersToStorage(users);
          localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
          resolve(newUser);
        }
      }, 800); // Simulate network delay
    });
  },

  logout: async () => {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  getCurrentUser: (): User | null => {
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    return stored ? JSON.parse(stored) : null;
  },

  // SUBSCRIPTIONS & PAYMENTS
  upgradePlan: async (userId: string, plan: PlanTier): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getAllUsersFromStorage();
        const index = users.findIndex(u => u.id === userId);
        
        if (index !== -1) {
          users[index].plan = plan;
          users[index].subscriptionStatus = 'active';
          saveUsersToStorage(users);
          
          // Update current session if it matches
          const currentUser = api.getCurrentUser();
          if (currentUser && currentUser.id === userId) {
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(users[index]));
          }
          
          resolve(users[index]);
        } else {
          reject(new Error('User not found'));
        }
      }, 1500); // Simulate payment processing time
    });
  },

  // ADMIN FEATURES
  getAllUsers: async (): Promise<User[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getAllUsersFromStorage());
      }, 500);
    });
  },

  deleteUser: async (userId: string): Promise<void> => {
    return new Promise((resolve) => {
        const users = getAllUsersFromStorage();
        const filtered = users.filter(u => u.id !== userId);
        saveUsersToStorage(filtered);
        resolve();
    });
  }
};
