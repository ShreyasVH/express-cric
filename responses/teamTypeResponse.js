class TeamTypeResponse {
  constructor(teamType) {
    this.id = teamType._id;
    this.name = teamType.name;
  }
}

module.exports = TeamTypeResponse;
