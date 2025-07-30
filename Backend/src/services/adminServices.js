import bcrypt from 'bcryptjs';


export const loginAdmin = async ({ email, password }, adminRepo) => {
    const admin = await adminRepo.findByEmail({ email });
    if (!admin) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) throw new Error('Invalid credentials');

    return {
        message: 'Login successful',
        admin: {
            id: admin._id,
            name: admin.name,
            email: admin.email,
        }
    };
};


export const logoutAdminService = async () => {
    return { message: 'Logout handled (client should clear token)' };
};


export const getAdminProfile = async (adminId) => {
    const admin = await adminRepo.findById(adminId).select('-password');
    if (!admin) throw new Error('admin not found');

    return {
        id: admin._id,
        name: admin.name,
        email: admin.email,
    };
};

export const findAllUsers = async (page, limit, userRepo) => {
    let query = ''
    const data = await userRepo.findAll(query, page, limit);
    return data;
};

export const editUserDetails = async (data, userRepo) => {
    const user = await userRepo.findByEmail(data.email);
    if (!user) throw new Error('User not found');

    user.name = data.name || user.name;
    user.email = data.email || user.email;
    user.username = data.username || user.username;
    user.phone = data.phone || user.phone;
    user.bio = data.bio || user.bio;
    user.profilePic = data.profilePic || user.profilePic;

    await user.save();
    const newUsers = await userRepo.findAll();

    return newUsers;
};


export const deleteUser = async (id, userRepo) => {
    const user = await userRepo.findByIdAndDelete(id);

    if (!user) throw new Error('User not found');

    const newUsers = await userRepo.findAll();

    return newUsers;
}


export const searchUser = async (query, page, limit, userRepo) => {
    const data = await userRepo.findAll(query, page, limit);
    return data;
}


export const addUser = async (userData, userRepo) => {
    const { name, email, username, phone, profilePic } = userData;

    const userExists = await userRepo.findByEmail(email);
    if (userExists) throw new Error('User already exists');

    const defaultPassword = '123456'

    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    const user = await userRepo.create({
        name,
        email,
        password: hashedPassword,
        username,
        phone,
        profilePic: profilePic || ''
    });

    await user.save();

    const newUsers = await userRepo.findAll();
    return newUsers;
}