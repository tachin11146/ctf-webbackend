const generator = require('generate-password');

class teamService {
    constructor(users, teams){
        this.users = users,
        this.teams = teams
    }

    async generateKey(){
        var checkKey = true
        var key

        while (checkKey){
          key = generator.generate({ length: 6, numbers: true });
          var team = await this.teams.findTeamByKey(key)

          if ( !team ){
            return key
          }
        }
    }

    async createTeam(name){
        var team = await this.teams.findTeamByName(name)
        if (team){
            return {error: true, message: "This name has already been used.", status: 400};
        }

        const key = await this.generateKey()
        await this.teams.createTeam(name, key)

        return {error: false, key: key}
    }

    async findTeamByKey(key){
        const id = await this.teams.findTeamByKey(key)
        if (id) {
            return {error: false, id: id}
        }
        return {error: true, message: "not found team", status: 400}
    }
}

module.exports = teamService;