import type { ITODO } from '@/types/helpers';

export const userMapperRadomUserMeToClient = (user: ITODO) => {
    return {
        id: user.login.uuid,
        email: user.email,
        fullName: `${user.name.first} ${user.name.last}`,
        avatar: user.picture.medium,
    };
};