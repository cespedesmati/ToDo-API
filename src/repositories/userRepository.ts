import User, { UserType } from "../model/userModel";

class UserRepository{

    async getAll(){
        return await User.find({}).select({"email":1});
    }

    async getById(id:string){
        return await User.findById(id).select({"email":1}); 
    }
    
    async save(user: UserType){
        return await User.create(user); 
    }

    async update(id:string,bodyUser:UserType){
        return await User.findByIdAndUpdate(id,bodyUser,{new:true}).select({"email":1});
    }

    async delete(id: string){
        return await User.findByIdAndRemove(id);
    }

    async getByEmail(email: string){
        return await User.findOne({email:email});
    }
}

export default UserRepository;