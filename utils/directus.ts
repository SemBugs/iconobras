export const getRoleBySlug = (slug: string) => {
    const roles = {
        administrator: '6039aa31-f86d-4c86-b50f-094c09c4ffa1',
        cliente: 'adb1a3f1-e4a8-4aae-b313-59a4fed37c23',
        gestor: '06deb95d-47bf-429f-9b5b-4d82e335e608',
        profissional: 'f08fb5a6-ecfd-489e-af4e-94a36c3efb60',
        projetista: '6e172dfe-b4a1-44bc-a66a-79483902f526',
        vendedor: 'f1349235-21ba-45b5-b863-7524b7f760b9',
    };

    return  roles[slug as keyof typeof roles];
};

export const hasPermission = (role: string, permission: string) => {
    const permissions = {
        publico: [],
        administrator: ['admin'],
        cliente: ['cliente'],
        gestor: ['gestor'],
        profissional: ['profissional'],
        projetista: ['projetista'],
        vendedor: ['vendedor'],
    };

    // @ts-ignore
    if (!permissions[role as keyof typeof permissions] || !permissions[role as keyof typeof permissions]?.includes(permission)) {
        throw new Error(`Role or permission not found: ${role} - ${permission}`);
    }

    // @ts-ignore
    return permissions[role as keyof typeof permissions]?.includes(permission);
}
