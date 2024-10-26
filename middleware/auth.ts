export default defineNuxtRouteMiddleware(async (to, _from) => {
    const { fetchUser, setUser } = useDirectusAuth();
    const user = useDirectusUser();
    if (!user.value) {
        const user = await fetchUser();
        setUser(user.value);
    }

    // if (!company_selected && to.path !== '/auth/companies') {
    //     return navigateTo('/auth/companies');
    // }

    // // complete empresa profile
    // if (company_selected && to.path !== '/users/user-account-settings') {
    //     const { razao_social } = company_selected;
    //     if (!razao_social) {
    //         return navigateTo('/users/user-account-settings');
    //     }
    // }

    // Redirect to login if user is not logged in
    if (!user.value && to.path !== '/auth/login' && to.path !== '/auth/login') {
        return navigateTo('/auth/login');
    }
});
