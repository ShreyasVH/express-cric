const DismissalModeRepository = require('../repositories/dismissalModeRepository');

class DismissalModeService {
    constructor() {
        this.dismissalModeRepository = new DismissalModeRepository();
    }

    async getAll () {
        return this.dismissalModeRepository.getAll();
    }
}

module.exports = DismissalModeService;
