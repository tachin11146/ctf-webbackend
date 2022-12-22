const crypto    = require('crypto');
const generator = require('generate-password');

class userService {
    constructor(users, teams){
        this.users = users,
        this.teams = teams
    }

    async findUserByEmail(email){
        const user = await this.users.findUserByEmail(email);
        return user
    }

    async hashText(text){
        return crypto.createHash('md5').update(text).digest('hex');
    }

    async createUser(firstname, lastname, email, password){
        const user = await this.users.findUserByEmail(email)
        if (user){
            return {error: true, message: "This e-mail has already been used.", status: 400};
        } 

        const result = await this.users.createUser(firstname, lastname, email, password)
        if (result){
            return {error: false}
        }
        return {error: true, message: "Create user is fail", status:400}
    }

    async joinTeam(id, teamId){
        const result = await this.users.joinTeam(id, teamId)
        if (result){
            return {error: false}
        }
        return {error: true, message: "join team fail", status:400}
    }

    async findAllUserByTeamId(id){
        const result = await this.users.findAllUserByTeamId(id);
        return result
    }
}

module.exports = userService;