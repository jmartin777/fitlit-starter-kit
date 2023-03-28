class User {
    constructor(userData){
        const randomUser = Math.floor(Math.random() * 49);
        for(var i  = 0; i < userData.users.length; i++){
            //MEANT TO FIND THE RANDOM USER
            // if user input matches a user- store all of the users data in the variables
            if (userData.users[i].id === randomUser){
                console.log(`Random User ${userData.users[i].name} Found!`)
                this.userId = userData.users[i].id
                this.userName = userData.users[i].name
                this.address = userData.users[i].address
                this.email = userData.users[i].email
                this.strideLength = userData.users[i].strideLength
                this.dailyStepGoal = userData.users[i].dailyStepGoal
                this.friends = userData.users[i].friends
                
            }
            else{
                //console.log("User Not Found!")
            }
        }
    }
    findUserById(userId,userData){
        for(var i  = 0; i < userData.users.length; i++){
            //MEANT TO FIND THE SELECTED USER
            // if user input matches a user- store all of the users data in the variables
            if (userData.users[i].id === userId){
                console.log(`User ${userData.users[i].name} Found By ID!`)
                this.userId = userData.users[i].id
                this.userName = userData.users[i].name
                this.address = userData.users[i].address
                this.email = userData.users[i].email
                this.strideLength = userData.users[i].strideLength
                this.dailyStepGoal = userData.users[i].dailyStepGoal
                this.friends = userData.users[i].friends
                return 
                
            }
            else{
                //console.log("User Not Found!")
            }
        }
    }
    findOverAllStepGoal(userData) {
        let sum = 0
        for(var i  = 0; i < userData.users.length; i++){
            sum += userData.users[i].dailyStepGoal
        }
        sum = sum / userData.users.length
        //console.log("divided sum="+sum)
        return sum
    }
    
    userFirstName(){
        const nameArr = this.userName.split(" ")
        console.log(nameArr[0])
        return nameArr[0]
    }

    userFirstNameById(userId,userData){
        let nameArr = ""
        for(var i  = 0; i < userData.users.length; i++){
            if (userData.users[i].id === userId){
                const name = userData.users[i].name
                nameArr = name.split(" ")
            }
            else{
                //console.log("User Not Found!")
            }
        }
        if(!(nameArr === "")){
            console.log(`User First Name :${nameArr[0]} Found By ID!`)
            return nameArr[0]
        }
        else{
            console.log("User Not Found!")
            return ""
        }
    }
    

}
export default User










/*
Iteration 1 Classes :### 
Class - allUsers 
constructor (userData) 
properties 
- A place holds onto all of the user data objects 
- hold list of user objects method - 

findUserByID = return userID object 
- findOverAllStepGoal 
- randomUserID 

### **
Class SingleUser (needed to store info for random gen user?)

** constructor (UserObject) 
properties id name address email strideLength dailyStepGoal 

UserFriends methods 
`userFirstName()` `findToday()` the most recent day
*/