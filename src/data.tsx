import { Scenarios } from './types';

export const blankScenarios: Scenarios = {
    byId: {
        0: {
            id: '0',
            children: ['1', '65', '66', '81', '93'],
            name: '',
            isUnlocked: true,
            isCompleted: true,
        },
        1: {
            id: '1',
            children: ['2'],
            name: 'Black Barrow',
            isUnlocked: false,
            isCompleted: false,
        },
        2: {
            id: '2',
            children: ['3', '4'],
            name: 'Barrow Lair',
            isUnlocked: false,
            isCompleted: false,
        },
        3: {
            id: '3',
            children: ['8', '9'],
            name: 'Inox Encampment',
            isUnlocked: false,
            isCompleted: false,
        },
        4: {
            id: '4',
            children: ['5', '6'],
            name: 'Crypt of the Damned',
            isUnlocked: false,
            isCompleted: false,
        },
        5: {
            id: '5',
            children: [],
            name: 'Ruinous Crypt',
            isUnlocked: false,
            isCompleted: false,
        },
        6: {
            id: '6',
            children: [],
            name: 'Decaying Crypt',
            isUnlocked: false,
            isCompleted: false,
        },
        7: {
            id: '7',
            children: ['20'],
            name: 'Vibrant Grotto',
            isUnlocked: false,
            isCompleted: false,
        },
        8: {
            id: '8',
            children: ['7', '13', '14'],
            name: 'Gloomhaven Warehouse',
            isUnlocked: false,
            isCompleted: false,
        },
        9: {
            id: '9',
            children: [],
            name: 'Diamond Mind',
            isUnlocked: false,
            isCompleted: false,
            blockedBy: ['8'],
        },
        13: {
            id: '13',
            children: [],
            name: 'Temple of the Seer',
            isUnlocked: false,
            isCompleted: false,
        },
        14: {
            id: '14',
            children: [],
            name: 'Frozen Hollow',
            isUnlocked: false,
            isCompleted: false,
        },
        20: {
            id: '20',
            children: [],
            name: "Necromancer's Sanctum",
            isUnlocked: false,
            isCompleted: false,
        },
        65: {
            id: '65',
            children: [],
            name: 'Sulfur Mine',
            isUnlocked: false,
            isCompleted: false,
        },
        66: {
            id: '66',
            children: [],
            name: 'Clockwork Cove',
            isUnlocked: false,
            isCompleted: false,
        },
        81: {
            id: '81',
            children: [],
            name: 'Temple of the Eclipse',
            isUnlocked: false,
            isCompleted: false,
        },
        93: {
            id: '93',
            children: [],
            name: 'Sunken Vessel',
            isUnlocked: false,
            isCompleted: false,
        },
    },
    allIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 13, 14, 20, 65, 66, 81, 93]
};

export const currentScenarios: Scenarios = {
    byId: {
        0: {
            id: '0',
            children: ['1', '65', '66', '81', '93'],
            name: '',
            isUnlocked: true,
            isCompleted: true,
        },
        1: {
            id: '1',
            children: ['2'],
            name: 'Black Barrow',
            isUnlocked: true,
            isCompleted: true,
        },
        2: {
            id: '2',
            children: ['3', '4'],
            name: 'Barrow Lair',
            isUnlocked: true,
            isCompleted: true,
        },
        3: {
            id: '3',
            children: ['8', '9'],
            name: 'Inox Encampment',
            isUnlocked: true,
            isCompleted: true,
        },
        4: {
            id: '4',
            children: ['5', '6'],
            name: 'Crypt of the Damned',
            isUnlocked: true,
            isCompleted: true,
        },
        5: {
            id: '5',
            children: [],
            name: 'Ruinous Crypt',
            isUnlocked: true,
            isCompleted: false,
        },
        6: {
            id: '6',
            children: [],
            name: 'Decaying Crypt',
            isUnlocked: true,
            isCompleted: false,
        },
        7: {
            id: '7',
            children: ['20'],
            name: 'Vibrant Grotto',
            isUnlocked: true,
            isCompleted: true,
        },
        8: {
            id: '8',
            children: ['7', '13', '14'],
            name: 'Gloomhaven Warehouse',
            isUnlocked: true,
            isCompleted: true,
        },
        9: {
            id: '9',
            children: [],
            name: 'Diamond Mind',
            isUnlocked: true,
            isCompleted: false,
            blockedBy: ['8'],
        },
        13: {
            id: '13',
            children: [],
            name: 'Temple of the Seer',
            isUnlocked: true,
            isCompleted: false,
        },
        14: {
            id: '14',
            children: [],
            name: 'Frozen Hollow',
            isUnlocked: true,
            isCompleted: false,
        },
        20: {
            id: '20',
            children: [],
            name: "Necromancer's Sanctum",
            isUnlocked: true,
            isCompleted: false,
        },
        65: {
            id: '65',
            children: [],
            name: 'Sulfur Mine',
            isUnlocked: true,
            isCompleted: false,
        },
        66: {
            id: '66',
            children: [],
            name: 'Clockwork Cove',
            isUnlocked: true,
            isCompleted: false,
        },
        81: {
            id: '81',
            children: [],
            name: 'Temple of the Eclipse',
            isUnlocked: true,
            isCompleted: false,
        },
        93: {
            id: '93',
            children: [],
            name: 'Sunken Vessel',
            isUnlocked: true,
            isCompleted: false,
        },
    },
    allIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 13, 14, 20, 65, 66, 81, 93]
};