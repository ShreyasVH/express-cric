class TeamResponse {
  constructor(team, country, teamType) {
    this.id = team._id;
    this.name = team.name;
    this.country = country;
    this.type = teamType;
  }
}

module.exports = TeamResponse;
