import { Boom } from '@hapi/boom';
import P from 'pino';
import { AnyMessageContent, delay, DisconnectReason, fetchLatestBaileysVersion, makeWALegacySocket, useSingleFileLegacyAuthState } from '@adiwajshing/baileys';
import { Commands } from './model/Commands';
import { JishoCommandService } from './model/services/JishoCommandService';
import { MenuCommandService } from './model/services/MenuCommandService';
import { CommandService } from './model/services/CommandService';
import { VideoCommandService } from './model/services/VideoCommandService';
import { MusicCommandService } from './model/services/MusicCommandService';


const { state, saveState } = useSingleFileLegacyAuthState('./auth_info.json');

const startSock = async () => {
    const { version, isLatest } = await fetchLatestBaileysVersion();
    console.log(`using WA v${version.join('.')}, isLatest: ${isLatest}`)

    const sock = makeWALegacySocket({
        version,
        logger: P({ level: 'debug' }),
        printQRInTerminal: true,
        auth: state,
    });

    sock.ev.on('chats.set', item => console.log(`recv ${item.chats.length} chats (is latest: ${item.isLatest})`));
    sock.ev.on('messages.set', item => console.log(`recv ${item.messages.length} messages (is latest: ${item.isLatest})`));
    sock.ev.on('contacts.set', item => console.log(`recv ${item.contacts.length} contacts`));

    sock.ev.on('messages.upsert', async m => {
        const msg = m.messages[0];
        const jid = msg.key.remoteJid;

        const commands: CommandService[] = [
            new JishoCommandService(sock, jid, msg),
            new MenuCommandService(sock, jid, msg),
            new VideoCommandService(sock, jid, msg),
            new MusicCommandService(sock, jid, msg)
        ];

        commands.map(command => {
            new Commands(command);
        });
    });

    sock.ev.on('messages.update', m => console.log(m));
    sock.ev.on('message-receipt.update', m => console.log(m));
    sock.ev.on('presence.update', m => console.log(m));
    sock.ev.on('chats.update', m => console.log(m));
    sock.ev.on('contacts.upsert', m => console.log(m));

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update; 

        if(connection === 'close') {
            if((lastDisconnect.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut) {
                startSock();
            } else {
                console.log('connection closed');
            };
        }

        console.log('connection update', update); 
    });

    sock.ev.on('creds.update', saveState);

    return sock;
};

startSock();