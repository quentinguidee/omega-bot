/**
 * Copyright © 2022 Maxime Friess <M4x1me@pm.me>
 *
 * This file is part of Omega-Modbot.
 *
 * Omega-Modbot is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Omega-Modbot is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Omega-Modbot.  If not, see <https://www.gnu.org/licenses/>.
 */

import { Sequelize } from 'sequelize';
import { HardConfig } from '../config/HardConfig';
import { associateEntities, initEntities } from '../entities';
import { Log, Logger } from './Logger';

class ORMManager {
    private sequelize: Sequelize
    private logger: Log

    constructor() {
        this.logger = Logger.getLogger('ORM');
        this.sequelize = new Sequelize(HardConfig.getDatabaseURL(), {
            logging: msg => this.logger.debug(msg)
        })
    }

    async init() {
        this.logger.info("Initializing ORM...");
        initEntities(this.sequelize);
        associateEntities(this.sequelize);
        await this.sequelize.sync();
    }

    get(): Sequelize {
        return this.sequelize;
    }
}

export const ORM = new ORMManager();
