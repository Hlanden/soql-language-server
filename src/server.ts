/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { createConnection, ProposedFeatures } from 'vscode-languageserver/node';
import { setupServerConnection } from './serverCore';

const connection = createConnection(ProposedFeatures.all);
setupServerConnection(connection);
connection.listen();
