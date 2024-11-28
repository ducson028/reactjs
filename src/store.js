import { create } from 'zustand';

const useUserStore = create((set) => ({
  users: [],
  setUsers: (newUsers) => set({ users: newUsers }),

  userLogin: [{ account: 'admin', password: '123' }],
  currentUser: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',

  login: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isAuthenticated', 'true');
    set({
      currentUser: user,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.setItem('isAuthenticated', 'false');
    set({
      currentUser: null,
      isAuthenticated: false,
    });
  },
}));

export default useUserStore;
