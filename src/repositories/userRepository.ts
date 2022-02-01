import User, { UserType } from "../model/userModel";

class UserRepository{
 
    async save(user: UserType){
        return await User.create(user); 
    }
}

export default UserRepository;