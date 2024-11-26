import {create} from 'zustand';

const useUserStore = create((set) => ({
  users: [],
  setUsers: (newUsers) => set({ users: newUsers }),

  
  userLogin: [
    { account: 'admin', password: '123' }, 
  ],
  currentUser: null,
  isAuthenticated: false,
  login: (user) => set((state) => ({
    currentUser: user,
    isAuthenticated: true
  })),
  logout: () => set(() => ({
    userLogin: [],
    isAuthenticated: false
  })),
}));

export default useUserStore;
