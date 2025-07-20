import { createContext, useState, useEffect, useContext } from "react";
import { account } from "../appwrite/appwriteConfig";
import { useNavigate } from "react-router-dom";
import { ID } from 'appwrite';

const AuthContext = createContext();

// List of admin emails
const adminEmails = ['newuser123@gmail.com', 'devang@vit.edu'];

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        checkUserStatus();
    }, []);

    const loginUser = async (userInfo) => {
        setLoading(true);
        console.log('userInfo', userInfo);

        try {
            let response = await account.createEmailPasswordSession(userInfo.email, userInfo.password);
            let accountDetails = await account.get();
            setUser(accountDetails);
            setIsAdmin(adminEmails.includes(accountDetails.email)); // Check admin
        } catch (error) {
            console.error(error);
        }

        setLoading(false);
    };

    const logoutUser = async () => {
        await account.deleteSession('current');
        setUser(null);
        setIsAdmin(false);
    };

    const registerUser = async (userInfo) => {
        setLoading(true);

        try {
            let response = await account.create(ID.unique(), userInfo.email, userInfo.password1, userInfo.name);
            await account.createEmailSession(userInfo.email, userInfo.password1);
            let accountDetails = await account.get();
            setUser(accountDetails);
            setIsAdmin(adminEmails.includes(accountDetails.email)); // Check admin
            navigate('/');
        } catch (error) {
            console.error(error);
        }

        setLoading(false);
    };

    const checkUserStatus = async () => {
  try {
    const accountDetails = await account.get();
    console.log('✅ Session found:', accountDetails);
    setUser(accountDetails);
    setIsAdmin(adminEmails.includes(accountDetails.email));
  } catch (error) {
    console.log('❌ No session found.');
    setUser(null);
    setIsAdmin(false);
  }
  setLoading(false);
};


    const contextData = {
        user,
        isAdmin,
        loginUser,
        logoutUser,
        registerUser,
        checkUserStatus
    };

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    );
};

// Custom Hook
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
