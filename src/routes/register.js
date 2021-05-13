export const routes = (router) => {
  router.post('/register', async (req, res) => {
    res.send('User is Registered');
  });
};
