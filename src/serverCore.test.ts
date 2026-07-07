/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { setupServerConnection } from './serverCore';
import { Connection, InitializeParams } from 'vscode-languageserver';

function makeConnection(): { connection: Connection; capturedInitResult: any } {
  let initHandler: ((params: InitializeParams) => any) | undefined;

  const connection = {
    onInitialize: jest.fn((handler) => { initHandler = handler; }),
    onDidChangeWatchedFiles: jest.fn(),
    onCompletion: jest.fn(),
    sendNotification: jest.fn().mockReturnValue(Promise.resolve()),
    console: { log: jest.fn(), error: jest.fn() },
    // TextDocuments.listen registers these handlers
    onDidOpenTextDocument: jest.fn(),
    onDidChangeTextDocument: jest.fn(),
    onDidCloseTextDocument: jest.fn(),
    onDidSaveTextDocument: jest.fn(),
    onWillSaveTextDocument: jest.fn(),
    onWillSaveTextDocumentWaitUntil: jest.fn(),
    onNotification: jest.fn(),
  } as unknown as Connection;

  setupServerConnection(connection);

  const fakeParams: InitializeParams = {
    processId: null,
    rootUri: null,
    capabilities: {},
    workspaceFolders: null,
  };

  const capturedInitResult = initHandler!(fakeParams);

  return { connection, capturedInitResult };
}

describe('serverCore: server capabilities', () => {
  it('advertises "." as a completion trigger character so dot-traversal completions auto-appear', () => {
    const { capturedInitResult } = makeConnection();
    const triggerChars: string[] =
      capturedInitResult?.capabilities?.completionProvider?.triggerCharacters ?? [];
    expect(triggerChars).toContain('.');
  });

  it('still advertises " " as a completion trigger character', () => {
    const { capturedInitResult } = makeConnection();
    const triggerChars: string[] =
      capturedInitResult?.capabilities?.completionProvider?.triggerCharacters ?? [];
    expect(triggerChars).toContain(' ');
  });

  it('advertises "\\t" (tab) as a completion trigger character', () => {
    const { capturedInitResult } = makeConnection();
    const triggerChars: string[] =
      capturedInitResult?.capabilities?.completionProvider?.triggerCharacters ?? [];
    expect(triggerChars).toContain('\t');
  });

  it('advertises "," as a completion trigger character', () => {
    const { capturedInitResult } = makeConnection();
    const triggerChars: string[] =
      capturedInitResult?.capabilities?.completionProvider?.triggerCharacters ?? [];
    expect(triggerChars).toContain(',');
  });

  it('advertises "(" as a completion trigger character', () => {
    const { capturedInitResult } = makeConnection();
    const triggerChars: string[] =
      capturedInitResult?.capabilities?.completionProvider?.triggerCharacters ?? [];
    expect(triggerChars).toContain('(');
  });

  it('advertises "=" as a completion trigger character', () => {
    const { capturedInitResult } = makeConnection();
    const triggerChars: string[] =
      capturedInitResult?.capabilities?.completionProvider?.triggerCharacters ?? [];
    expect(triggerChars).toContain('=');
  });

  it('advertises "\\n" (newline) as a completion trigger character', () => {
    const { capturedInitResult } = makeConnection();
    const triggerChars: string[] =
      capturedInitResult?.capabilities?.completionProvider?.triggerCharacters ?? [];
    expect(triggerChars).toContain('\n');
  });
});
