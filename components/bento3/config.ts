export interface TConfig {
  col: number
  cellW: number
  cellH: number
}

export interface TNode {
  id: string
  w: number
  h: number
  x: number
  y: number
  minH: number
  minW: number
}

export const config: TConfig = {
  col: 36,
  cellW: 36,
  cellH: 36,
}

export const nodes: TNode[] = [
  {
    id: 'a151ceca-b1eb-4ef4-b1f2-11148a2aaf43',
    w: 12,
    h: 4,
    x: 0,
    y: 0,
    minH: 8,
    minW: 9,
  },
  {
    id: '4c5e8287-bc35-45d5-93cc-a92ef76433c3',
    w: 12,
    h: 8,
    x: 12,
    y: 0,
    minH: 8,
    minW: 9,
  },
  {
    id: 'b67c9864-0b78-472c-b83c-09b6dc52981c',
    w: 12,
    h: 8,
    x: 24,
    y: 0,
    minH: 8,
    minW: 9,
  },
  {
    id: '44b38a9b-4467-4d93-ba66-11d935c1f6af',
    w: 12,
    h: 6,
    x: 0,
    y: 4,
    minH: 8,
    minW: 9,
  },
  {
    id: '0c696606-6c40-4a40-aa29-0df9606ca4ac',
    w: 6,
    h: 6,
    x: 24,
    y: 8,
    minH: 8,
    minW: 9,
  },
  {
    id: 'd97e7ec5-bf45-4cc0-8829-a427e01ef763',
    w: 12,
    h: 5,
    x: 0,
    y: 10,
    minH: 8,
    minW: 9,
  },
  {
    id: '8b24946c-f6a0-41e0-97e3-8e58b4174b54',
    w: 12,
    h: 4,
    x: 12,
    y: 8,
    minH: 8,
    minW: 9,
  },
  {
    id: '3f321c72-8cd3-441b-a526-b1c5434b2ef7',
    w: 6,
    h: 6,
    x: 30,
    y: 8,
    minH: 2,
    minW: 3,
  },
  {
    id: '51ac4bda-43ce-436c-a43b-4003b7cd55e1',
    w: 12,
    h: 8,
    x: 0,
    y: 15,
    minH: 2,
    minW: 3,
  },
  {
    id: '907848fe-cae2-41ce-889f-1d5ea5c7686b',
    w: 12,
    h: 4,
    x: 12,
    y: 12,
    minH: 8,
    minW: 9,
  },
  {
    id: '5d81f234-8e15-4dad-a05f-a73b3655dab2',
    w: 12,
    h: 8,
    x: 12,
    y: 16,
    minH: 8,
    minW: 9,
  },
  {
    id: '194ed70e-ef0e-4dd7-b438-6321358944c6',
    w: 8,
    h: 7,
    x: 24,
    y: 14,
    minH: 8,
    minW: 9,
  },
]
