import { create } from 'zustand';
import Cookies from 'js-cookie';

const useUserStore = create((set) => ({
  users: [],
  setUsers: (newUsers) => set({ users: newUsers }),

  userLogin: [{ account: 'admin', password: '123' }],
  currentUser: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
  isAuthenticated: Cookies.get('isAuthenticated') === 'true',

  login: (user) => {
    Cookies.set('user', JSON.stringify(user), { expires: 7 }); // Cookie tồn tại 7 ngày
    Cookies.set('isAuthenticated', 'true', { expires: 7 });
    set({
      currentUser: user,
      isAuthenticated: true,
    });
  },

  logout: () => {
    Cookies.remove('user');
    Cookies.remove('isAuthenticated');
    set({
      currentUser: null,
      isAuthenticated: false,
    });
  },
}));

export default useUserStore;
