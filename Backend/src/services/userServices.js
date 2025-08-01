import bcrypt from 'bcryptjs';


export const registerUser = async (userData, userRepo) => {
    const { name, email, phone, password, profilePic } = userData;

    const userExists = await userRepo.findByEmail(email);
    if (userExists) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userRepo.create({
        name,
        email,
        password: hashedPassword,
        username: '',
        phone: phone || 'N/A',
        profilePic: profilePic || ''
    });

    return {
        message: 'User registered successfully',
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    };
};


export const loginUser = async (userData, userRepo) => {
    const { email, password } = userData;

    const user = await userRepo.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    return {
        message: 'Login successful',
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user?.phone || '',
            username: user?.username || '',
            profilePic: user?.profilePic || ''
        }
    };
};


export const logoutUserService = async () => {
    return { message: 'Logout handled (client should clear token)' };
};


export const getUserProfile = async (userId, userRepo) => {
    const user = await userRepo.findById(userId).select('-password');
    if (!user) throw new Error('User not found');

    return {
        id: user?._id,
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        username: user?.username,
        profilePic: user?.profilePic
    };
};


export const getCurrentUser = async (user, userRepo) => {
    try {
        if (!user || !user.id) {
            throw new Error('User not authenticated');
        }

        const currentUser = await userRepo.findById(user.id);

        if (!currentUser) {
            throw new Error('User not found');
        }

        return {
            message: 'Fetched current user',
            user: {
                id: currentUser._id,
                name: currentUser.name,
                email: currentUser.email,
                phone: currentUser?.phone || '',
                username: currentUser?.username || '',
                profilePic: currentUser?.profilePic || ''
            }
        };
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Server error' });
    }
}

export const updateCurrentUser = async (data, userRepo) => {
    const user = await userRepo.findByEmail(data.email);

    if (!user) throw new Error('User not found');

    user.name = data.name || user.name;
    user.email = data.email || user.email;
    user.username = data.username || user.username;
    user.phone = data.phone || user.phone;
    user.bio = data.bio || user.bio;
    user.profilePic = data.profilePic || user.profilePic;

    const updatedUser = await user.save();
    return updatedUser;
}