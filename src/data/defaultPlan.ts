import { UserPlan } from '../store/useAppStore';

const todayISO = new Date().toISOString().slice(0, 10);

export const defaultPlan: UserPlan = {
  startDateISO: todayISO,
  repeats: true,
  days: [
    {
      index: 1,
      masa1: {
        id: 'd1-m1',
        titlu: 'Omletă mare cu cârnați de curcan și ciuperci',
        oraImplicita: '12:00',
        caloriiEstimate: 980,
        ingrediente: [
          { id: 'd1-m1-i1', nume: 'ouă', cantitate: 2, unitate: 'buc' },
          { id: 'd1-m1-i2', nume: 'cârnați de curcan', cantitate: 140, unitate: 'g' },
          { id: 'd1-m1-i3', nume: 'ciuperci', cantitate: 250, unitate: 'g' },
          { id: 'd1-m1-i4', nume: 'ceapă', cantitate: 50, unitate: 'g' },
          { id: 'd1-m1-i5', nume: 'brânză maturată', cantitate: 40, unitate: 'g' },
          { id: 'd1-m1-i6', nume: 'ulei de măsline', cantitate: 10, unitate: 'g' }
        ],
        reteta: {
          pasi: [
            'Taie ciupercile și ceapa.',
            'Sotează ciupercile și ceapa 5-6 minute în ulei.',
            'Adaugă cârnații feliați și mai gătește 3-4 minute.',
            'Bate ouăle și toarnă peste compoziție.',
            'Presară brânza și mai gătește 2-3 minute până se leagă.'
          ],
          prepMinute: 8,
          cookMinute: 12
        }
      },
      masa2: {
        id: 'd1-m2',
        titlu: 'Salată standard cu pui',
        oraImplicita: '19:00',
        caloriiEstimate: 820,
        ingrediente: [
          { id: 'd1-m2-i1', nume: 'pui gătit', cantitate: 220, unitate: 'g' },
          { id: 'd1-m2-i2', nume: 'roșii', cantitate: 300, unitate: 'g' },
          { id: 'd1-m2-i3', nume: 'castraveți', cantitate: 200, unitate: 'g' },
          { id: 'd1-m2-i4', nume: 'ceapă', cantitate: 40, unitate: 'g' },
          { id: 'd1-m2-i5', nume: 'nuci', cantitate: 35, unitate: 'g', note: 'nuci românești' },
          { id: 'd1-m2-i6', nume: 'iaurt grecesc 10%', cantitate: 150, unitate: 'g' },
          { id: 'd1-m2-i7', nume: 'ulei de măsline', cantitate: 10, unitate: 'g' },
          { id: 'd1-m2-i8', nume: 'lămâie (suc)', cantitate: 30, unitate: 'g' }
        ],
        reteta: {
          pasi: [
            'Taie legumele.',
            'Amestecă iaurtul cu uleiul și lămâia pentru dressing.',
            'Adaugă puiul feliat și nucile.',
            'Toarnă dressingul și amestecă ușor.'
          ],
          prepMinute: 10,
          cookMinute: 0
        }
      }
    },
    {
      index: 2,
      masa1: {
        id: 'd2-m1',
        titlu: 'Quiche de legume & cașcaval (1 porție)',
        oraImplicita: '12:00',
        caloriiEstimate: 820,
        ingrediente: [
          { id: 'd2-m1-i1', nume: 'ouă', cantitate: 2, unitate: 'buc' },
          { id: 'd2-m1-i2', nume: 'smântână 30%', cantitate: 100, unitate: 'ml' },
          { id: 'd2-m1-i3', nume: 'cașcaval', cantitate: 75, unitate: 'g' },
          { id: 'd2-m1-i4', nume: 'dovlecel', cantitate: 125, unitate: 'g' },
          { id: 'd2-m1-i5', nume: 'ardei', cantitate: 75, unitate: 'g' },
          { id: 'd2-m1-i6', nume: 'ceapă', cantitate: 25, unitate: 'g' },
          { id: 'd2-m1-i7', nume: 'ulei de măsline', cantitate: 5, unitate: 'g' }
        ],
        reteta: {
          pasi: [
            'Preîncălzește cuptorul la 180°C.',
            'Taie legumele și sotează 5-7 minute cu ulei.',
            'Bate ouăle, adaugă smântâna și condimentează.',
            'Încorporează cașcavalul ras și legumele.',
            'Toarnă într-o tavă cu hârtie de copt.',
            'Coace 35-40 minute până se încheagă.'
          ],
          prepMinute: 12,
          cookMinute: 40
        }
      },
      masa2: {
        id: 'd2-m2',
        titlu: 'Salată standard cu pui',
        oraImplicita: '19:00',
        caloriiEstimate: 800,
        ingrediente: [
          { id: 'd2-m2-i1', nume: 'pui gătit', cantitate: 200, unitate: 'g' },
          { id: 'd2-m2-i2', nume: 'roșii', cantitate: 300, unitate: 'g' },
          { id: 'd2-m2-i3', nume: 'castraveți', cantitate: 200, unitate: 'g' },
          { id: 'd2-m2-i4', nume: 'ceapă', cantitate: 40, unitate: 'g' },
          { id: 'd2-m2-i5', nume: 'nuci', cantitate: 35, unitate: 'g', note: 'nuci românești' },
          { id: 'd2-m2-i6', nume: 'iaurt grecesc 10%', cantitate: 150, unitate: 'g' },
          { id: 'd2-m2-i7', nume: 'ulei de măsline', cantitate: 10, unitate: 'g' },
          { id: 'd2-m2-i8', nume: 'lămâie (suc)', cantitate: 30, unitate: 'g' }
        ],
        reteta: {
          pasi: [
            'Taie legumele.',
            'Amestecă iaurtul cu uleiul și lămâia pentru dressing.',
            'Adaugă puiul feliat și nucile.',
            'Toarnă dressingul și amestecă ușor.'
          ],
          prepMinute: 10,
          cookMinute: 0
        }
      }
    },
    {
      index: 3,
      masa1: {
        id: 'd3-m1',
        titlu: 'Friptură de porc slab + broccoli și iaurt',
        oraImplicita: '12:00',
        caloriiEstimate: 980,
        ingrediente: [
          { id: 'd3-m1-i1', nume: 'porc slab', cantitate: 250, unitate: 'g' },
          { id: 'd3-m1-i2', nume: 'broccoli', cantitate: 350, unitate: 'g' },
          { id: 'd3-m1-i3', nume: 'iaurt grecesc 10%', cantitate: 150, unitate: 'g' },
          { id: 'd3-m1-i4', nume: 'ulei de măsline', cantitate: 10, unitate: 'g' }
        ],
        reteta: {
          pasi: [
            'Condimentează carnea și gătește-o în tigaie sau cuptor.',
            'Gătește 20-25 minute până este făcută.',
            'Fierbe sau aburește broccoli 6-8 minute.',
            'Servește cu iaurt și ulei de măsline peste broccoli.'
          ],
          prepMinute: 8,
          cookMinute: 25
        }
      },
      masa2: {
        id: 'd3-m2',
        titlu: 'Salată standard cu curcan',
        oraImplicita: '19:00',
        caloriiEstimate: 800,
        ingrediente: [
          { id: 'd3-m2-i1', nume: 'curcan gătit', cantitate: 210, unitate: 'g' },
          { id: 'd3-m2-i2', nume: 'roșii', cantitate: 300, unitate: 'g' },
          { id: 'd3-m2-i3', nume: 'castraveți', cantitate: 200, unitate: 'g' },
          { id: 'd3-m2-i4', nume: 'ceapă', cantitate: 40, unitate: 'g' },
          { id: 'd3-m2-i5', nume: 'nuci', cantitate: 35, unitate: 'g', note: 'nuci românești' },
          { id: 'd3-m2-i6', nume: 'iaurt grecesc 10%', cantitate: 150, unitate: 'g' },
          { id: 'd3-m2-i7', nume: 'ulei de măsline', cantitate: 10, unitate: 'g' },
          { id: 'd3-m2-i8', nume: 'lămâie (suc)', cantitate: 30, unitate: 'g' }
        ],
        reteta: {
          pasi: [
            'Taie legumele și pregătește dressingul.',
            'Adaugă curcanul feliat și nucile.',
            'Toarnă dressingul și amestecă ușor.'
          ],
          prepMinute: 10,
          cookMinute: 0
        }
      }
    },
    {
      index: 4,
      masa1: {
        id: 'd4-m1',
        titlu: 'Ouă fierte (2) + brânză + legume crude',
        oraImplicita: '12:00',
        caloriiEstimate: 920,
        ingrediente: [
          { id: 'd4-m1-i1', nume: 'ouă', cantitate: 2, unitate: 'buc' },
          { id: 'd4-m1-i2', nume: 'brânză maturată', cantitate: 60, unitate: 'g' },
          { id: 'd4-m1-i3', nume: 'ardei', cantitate: 150, unitate: 'g' },
          { id: 'd4-m1-i4', nume: 'castravete', cantitate: 150, unitate: 'g' },
          { id: 'd4-m1-i5', nume: 'iaurt grecesc 10%', cantitate: 150, unitate: 'g' },
          { id: 'd4-m1-i6', nume: 'nuci', cantitate: 20, unitate: 'g' }
        ],
        reteta: {
          pasi: [
            'Fierbe ouăle 10 minute și răcește-le.',
            'Taie legumele și porționează brânza.',
            'Servește cu iaurt și nuci alături.',
            'Adaugă ouăle tăiate pe jumătate.'
          ],
          prepMinute: 8,
          cookMinute: 10
        }
      },
      masa2: {
        id: 'd4-m2',
        titlu: 'Salată standard cu porc slab',
        oraImplicita: '19:00',
        caloriiEstimate: 830,
        ingrediente: [
          { id: 'd4-m2-i1', nume: 'porc slab gătit', cantitate: 190, unitate: 'g' },
          { id: 'd4-m2-i2', nume: 'roșii', cantitate: 300, unitate: 'g' },
          { id: 'd4-m2-i3', nume: 'castraveți', cantitate: 200, unitate: 'g' },
          { id: 'd4-m2-i4', nume: 'ceapă', cantitate: 40, unitate: 'g' },
          { id: 'd4-m2-i5', nume: 'nuci', cantitate: 35, unitate: 'g', note: 'nuci românești' },
          { id: 'd4-m2-i6', nume: 'iaurt grecesc 10%', cantitate: 150, unitate: 'g' },
          { id: 'd4-m2-i7', nume: 'ulei de măsline', cantitate: 10, unitate: 'g' },
          { id: 'd4-m2-i8', nume: 'lămâie (suc)', cantitate: 30, unitate: 'g' }
        ],
        reteta: {
          pasi: [
            'Taie legumele și fă dressingul.',
            'Adaugă porcul feliat și nucile.',
            'Toarnă dressingul și amestecă.'
          ],
          prepMinute: 10,
          cookMinute: 0
        }
      }
    },
    {
      index: 5,
      masa1: {
        id: 'd5-m1',
        titlu: 'Quiche cu pui/curcan și ciuperci (1 porție)',
        oraImplicita: '12:00',
        caloriiEstimate: 900,
        ingrediente: [
          { id: 'd5-m1-i1', nume: 'ouă', cantitate: 2, unitate: 'buc' },
          { id: 'd5-m1-i2', nume: 'smântână 30%', cantitate: 100, unitate: 'ml' },
          { id: 'd5-m1-i3', nume: 'carne de pui/curcan gătită', cantitate: 125, unitate: 'g' },
          { id: 'd5-m1-i4', nume: 'cașcaval', cantitate: 60, unitate: 'g' },
          { id: 'd5-m1-i5', nume: 'ciuperci', cantitate: 100, unitate: 'g' },
          { id: 'd5-m1-i6', nume: 'ceapă', cantitate: 25, unitate: 'g' },
          { id: 'd5-m1-i7', nume: 'ulei de măsline', cantitate: 5, unitate: 'g' }
        ],
        reteta: {
          pasi: [
            'Preîncălzește cuptorul la 180°C.',
            'Sotează ciupercile și ceapa 6-8 minute în ulei.',
            'Adaugă carnea mărunțită și mai gătește 2 minute.',
            'Bate ouăle cu smântâna și condimentează.',
            'Adaugă cașcavalul și amestecul de carne/ciuperci.',
            'Coace 35-40 minute.'
          ],
          prepMinute: 15,
          cookMinute: 40
        }
      },
      masa2: {
        id: 'd5-m2',
        titlu: 'Salată standard cu pui',
        oraImplicita: '19:00',
        caloriiEstimate: 800,
        ingrediente: [
          { id: 'd5-m2-i1', nume: 'pui gătit', cantitate: 200, unitate: 'g' },
          { id: 'd5-m2-i2', nume: 'roșii', cantitate: 300, unitate: 'g' },
          { id: 'd5-m2-i3', nume: 'castraveți', cantitate: 200, unitate: 'g' },
          { id: 'd5-m2-i4', nume: 'ceapă', cantitate: 40, unitate: 'g' },
          { id: 'd5-m2-i5', nume: 'nuci', cantitate: 35, unitate: 'g', note: 'nuci românești' },
          { id: 'd5-m2-i6', nume: 'iaurt grecesc 10%', cantitate: 150, unitate: 'g' },
          { id: 'd5-m2-i7', nume: 'ulei de măsline', cantitate: 10, unitate: 'g' },
          { id: 'd5-m2-i8', nume: 'lămâie (suc)', cantitate: 30, unitate: 'g' }
        ],
        reteta: {
          pasi: [
            'Taie legumele și fă dressingul.',
            'Adaugă puiul și nucile.',
            'Toarnă dressingul și amestecă.'
          ],
          prepMinute: 10,
          cookMinute: 0
        }
      }
    },
    {
      index: 6,
      masa1: {
        id: 'd6-m1',
        titlu: 'Burgeri de vită (2x100g) + ciuperci',
        oraImplicita: '12:00',
        caloriiEstimate: 980,
        ingrediente: [
          { id: 'd6-m1-i1', nume: 'vită tocată', cantitate: 200, unitate: 'g' },
          { id: 'd6-m1-i2', nume: 'ciuperci', cantitate: 250, unitate: 'g' },
          { id: 'd6-m1-i3', nume: 'ceapă', cantitate: 50, unitate: 'g' },
          { id: 'd6-m1-i4', nume: 'brânză maturată', cantitate: 40, unitate: 'g' },
          { id: 'd6-m1-i5', nume: 'ulei de măsline', cantitate: 10, unitate: 'g' }
        ],
        reteta: {
          pasi: [
            'Formează 2 burgeri și condimentează.',
            'Gătește burgerii 4-5 minute pe fiecare parte.',
            'Sotează ciupercile și ceapa 6-8 minute în ulei.',
            'Servește burgerii cu ciuperci și brânză.'
          ],
          prepMinute: 10,
          cookMinute: 15
        }
      },
      masa2: {
        id: 'd6-m2',
        titlu: 'Salată standard cu curcan',
        oraImplicita: '19:00',
        caloriiEstimate: 800,
        ingrediente: [
          { id: 'd6-m2-i1', nume: 'curcan gătit', cantitate: 210, unitate: 'g' },
          { id: 'd6-m2-i2', nume: 'roșii', cantitate: 300, unitate: 'g' },
          { id: 'd6-m2-i3', nume: 'castraveți', cantitate: 200, unitate: 'g' },
          { id: 'd6-m2-i4', nume: 'ceapă', cantitate: 40, unitate: 'g' },
          { id: 'd6-m2-i5', nume: 'nuci', cantitate: 35, unitate: 'g', note: 'nuci românești' },
          { id: 'd6-m2-i6', nume: 'iaurt grecesc 10%', cantitate: 150, unitate: 'g' },
          { id: 'd6-m2-i7', nume: 'ulei de măsline', cantitate: 10, unitate: 'g' },
          { id: 'd6-m2-i8', nume: 'lămâie (suc)', cantitate: 30, unitate: 'g' }
        ],
        reteta: {
          pasi: [
            'Taie legumele și pregătește dressingul.',
            'Adaugă curcanul feliat și nucile.',
            'Toarnă dressingul și amestecă ușor.'
          ],
          prepMinute: 10,
          cookMinute: 0
        }
      }
    },
    {
      index: 7,
      masa1: {
        id: 'd7-m1',
        titlu: 'Quiche cu spanac și brânză (1 porție)',
        oraImplicita: '12:00',
        caloriiEstimate: 800,
        ingrediente: [
          { id: 'd7-m1-i1', nume: 'ouă', cantitate: 2, unitate: 'buc' },
          { id: 'd7-m1-i2', nume: 'smântână 30%', cantitate: 100, unitate: 'ml' },
          { id: 'd7-m1-i3', nume: 'telemea/brânză maturată', cantitate: 75, unitate: 'g' },
          { id: 'd7-m1-i4', nume: 'spanac', cantitate: 100, unitate: 'g' },
          { id: 'd7-m1-i5', nume: 'usturoi', cantitate: 5, unitate: 'g' },
          { id: 'd7-m1-i6', nume: 'ulei de măsline', cantitate: 5, unitate: 'g' }
        ],
        reteta: {
          pasi: [
            'Preîncălzește cuptorul la 180°C.',
            'Încinge uleiul, adaugă usturoiul 30 secunde.',
            'Adaugă spanacul și gătește 2-3 minute.',
            'Bate ouăle cu smântâna și condimentează.',
            'Adaugă brânza și spanacul.',
            'Coace 30-35 minute.'
          ],
          prepMinute: 10,
          cookMinute: 35
        }
      },
      masa2: {
        id: 'd7-m2',
        titlu: 'Salată standard cu curcan',
        oraImplicita: '19:00',
        caloriiEstimate: 820,
        ingrediente: [
          { id: 'd7-m2-i1', nume: 'curcan gătit', cantitate: 220, unitate: 'g' },
          { id: 'd7-m2-i2', nume: 'roșii', cantitate: 300, unitate: 'g' },
          { id: 'd7-m2-i3', nume: 'castraveți', cantitate: 200, unitate: 'g' },
          { id: 'd7-m2-i4', nume: 'ceapă', cantitate: 40, unitate: 'g' },
          { id: 'd7-m2-i5', nume: 'nuci', cantitate: 35, unitate: 'g', note: 'nuci românești' },
          { id: 'd7-m2-i6', nume: 'iaurt grecesc 10%', cantitate: 150, unitate: 'g' },
          { id: 'd7-m2-i7', nume: 'ulei de măsline', cantitate: 10, unitate: 'g' },
          { id: 'd7-m2-i8', nume: 'lămâie (suc)', cantitate: 30, unitate: 'g' }
        ],
        reteta: {
          pasi: [
            'Taie legumele și pregătește dressingul.',
            'Adaugă curcanul feliat și nucile.',
            'Toarnă dressingul și amestecă.'
          ],
          prepMinute: 10,
          cookMinute: 0
        }
      }
    },
    {
      index: 8,
      masa1: {
        id: 'd8-m1',
        titlu: 'Pulpe de pui dezosate la cuptor + dovlecei copți',
        oraImplicita: '12:00',
        caloriiEstimate: 980,
        ingrediente: [
          { id: 'd8-m1-i1', nume: 'pulpe de pui dezosate', cantitate: 260, unitate: 'g' },
          { id: 'd8-m1-i2', nume: 'dovlecei', cantitate: 350, unitate: 'g' },
          { id: 'd8-m1-i3', nume: 'brânză maturată', cantitate: 40, unitate: 'g' },
          { id: 'd8-m1-i4', nume: 'ulei de măsline', cantitate: 10, unitate: 'g' }
        ],
        reteta: {
          pasi: [
            'Condimentează puiul și pune-l la cuptor 25-30 minute.',
            'Taie dovleceii și coace-i 20-25 minute.',
            'Poți folosi aceeași tavă pentru pui și dovlecei.',
            'Servește cu brânză maturată.'
          ],
          prepMinute: 10,
          cookMinute: 30
        }
      },
      masa2: {
        id: 'd8-m2',
        titlu: 'Salată standard cu pui',
        oraImplicita: '19:00',
        caloriiEstimate: 800,
        ingrediente: [
          { id: 'd8-m2-i1', nume: 'pui gătit', cantitate: 200, unitate: 'g' },
          { id: 'd8-m2-i2', nume: 'roșii', cantitate: 300, unitate: 'g' },
          { id: 'd8-m2-i3', nume: 'castraveți', cantitate: 200, unitate: 'g' },
          { id: 'd8-m2-i4', nume: 'ceapă', cantitate: 40, unitate: 'g' },
          { id: 'd8-m2-i5', nume: 'nuci', cantitate: 35, unitate: 'g', note: 'nuci românești' },
          { id: 'd8-m2-i6', nume: 'iaurt grecesc 10%', cantitate: 150, unitate: 'g' },
          { id: 'd8-m2-i7', nume: 'ulei de măsline', cantitate: 10, unitate: 'g' },
          { id: 'd8-m2-i8', nume: 'lămâie (suc)', cantitate: 30, unitate: 'g' }
        ],
        reteta: {
          pasi: [
            'Taie legumele și pregătește dressingul.',
            'Adaugă puiul și nucile.',
            'Toarnă dressingul și amestecă.'
          ],
          prepMinute: 10,
          cookMinute: 0
        }
      }
    },
    {
      index: 9,
      masa1: {
        id: 'd9-m1',
        titlu: 'Quiche de legume & cașcaval (1 porție)',
        oraImplicita: '12:00',
        caloriiEstimate: 820,
        ingrediente: [
          { id: 'd9-m1-i1', nume: 'ouă', cantitate: 2, unitate: 'buc' },
          { id: 'd9-m1-i2', nume: 'smântână 30%', cantitate: 100, unitate: 'ml' },
          { id: 'd9-m1-i3', nume: 'cașcaval', cantitate: 75, unitate: 'g' },
          { id: 'd9-m1-i4', nume: 'dovlecel', cantitate: 125, unitate: 'g' },
          { id: 'd9-m1-i5', nume: 'ardei', cantitate: 75, unitate: 'g' },
          { id: 'd9-m1-i6', nume: 'ceapă', cantitate: 25, unitate: 'g' },
          { id: 'd9-m1-i7', nume: 'ulei de măsline', cantitate: 5, unitate: 'g' }
        ],
        reteta: {
          pasi: [
            'Preîncălzește cuptorul la 180°C.',
            'Taie legumele și sotează 5-7 minute cu ulei.',
            'Bate ouăle, adaugă smântâna și condimentează.',
            'Încorporează cașcavalul ras și legumele.',
            'Toarnă într-o tavă cu hârtie de copt.',
            'Coace 35-40 minute până se încheagă.'
          ],
          prepMinute: 12,
          cookMinute: 40
        }
      },
      masa2: {
        id: 'd9-m2',
        titlu: 'Salată standard cu porc slab',
        oraImplicita: '19:00',
        caloriiEstimate: 830,
        ingrediente: [
          { id: 'd9-m2-i1', nume: 'porc slab gătit', cantitate: 190, unitate: 'g' },
          { id: 'd9-m2-i2', nume: 'roșii', cantitate: 300, unitate: 'g' },
          { id: 'd9-m2-i3', nume: 'castraveți', cantitate: 200, unitate: 'g' },
          { id: 'd9-m2-i4', nume: 'ceapă', cantitate: 40, unitate: 'g' },
          { id: 'd9-m2-i5', nume: 'nuci', cantitate: 35, unitate: 'g', note: 'nuci românești' },
          { id: 'd9-m2-i6', nume: 'iaurt grecesc 10%', cantitate: 150, unitate: 'g' },
          { id: 'd9-m2-i7', nume: 'ulei de măsline', cantitate: 10, unitate: 'g' },
          { id: 'd9-m2-i8', nume: 'lămâie (suc)', cantitate: 30, unitate: 'g' }
        ],
        reteta: {
          pasi: [
            'Taie legumele și fă dressingul.',
            'Adaugă porcul feliat și nucile.',
            'Toarnă dressingul și amestecă.'
          ],
          prepMinute: 10,
          cookMinute: 0
        }
      }
    },
    {
      index: 10,
      masa1: {
        id: 'd10-m1',
        titlu: 'Tocăniță de curcan + conopidă',
        oraImplicita: '12:00',
        caloriiEstimate: 980,
        ingrediente: [
          { id: 'd10-m1-i1', nume: 'curcan', cantitate: 250, unitate: 'g' },
          { id: 'd10-m1-i2', nume: 'ceapă', cantitate: 70, unitate: 'g' },
          { id: 'd10-m1-i3', nume: 'ardei', cantitate: 150, unitate: 'g' },
          { id: 'd10-m1-i4', nume: 'conopidă', cantitate: 350, unitate: 'g' },
          { id: 'd10-m1-i5', nume: 'iaurt grecesc 10%', cantitate: 120, unitate: 'g' },
          { id: 'd10-m1-i6', nume: 'ulei de măsline', cantitate: 10, unitate: 'g' }
        ],
        reteta: {
          pasi: [
            'Sotează ceapa și ardeiul 5 minute în ulei.',
            'Adaugă curcanul cuburi și rumenește 5-6 minute.',
            'Adaugă puțină apă și fierbe 20 minute.',
            'Fierbe sau aburește conopida 8-10 minute.',
            'Servește cu iaurt.'
          ],
          prepMinute: 12,
          cookMinute: 25
        }
      },
      masa2: {
        id: 'd10-m2',
        titlu: 'Salată standard cu pui',
        oraImplicita: '19:00',
        caloriiEstimate: 800,
        ingrediente: [
          { id: 'd10-m2-i1', nume: 'pui gătit', cantitate: 200, unitate: 'g' },
          { id: 'd10-m2-i2', nume: 'roșii', cantitate: 300, unitate: 'g' },
          { id: 'd10-m2-i3', nume: 'castraveți', cantitate: 200, unitate: 'g' },
          { id: 'd10-m2-i4', nume: 'ceapă', cantitate: 40, unitate: 'g' },
          { id: 'd10-m2-i5', nume: 'nuci', cantitate: 35, unitate: 'g', note: 'nuci românești' },
          { id: 'd10-m2-i6', nume: 'iaurt grecesc 10%', cantitate: 150, unitate: 'g' },
          { id: 'd10-m2-i7', nume: 'ulei de măsline', cantitate: 10, unitate: 'g' },
          { id: 'd10-m2-i8', nume: 'lămâie (suc)', cantitate: 30, unitate: 'g' }
        ],
        reteta: {
          pasi: [
            'Taie legumele.',
            'Amestecă iaurtul cu uleiul și lămâia pentru dressing.',
            'Adaugă puiul feliat și nucile.',
            'Toarnă dressingul și amestecă ușor.'
          ],
          prepMinute: 10,
          cookMinute: 0
        }
      }
    },
    {
      index: 11,
      masa1: {
        id: 'd11-m1',
        titlu: 'Omletă mare cu cașcaval',
        oraImplicita: '12:00',
        caloriiEstimate: 940,
        ingrediente: [
          { id: 'd11-m1-i1', nume: 'ouă', cantitate: 2, unitate: 'buc' },
          { id: 'd11-m1-i2', nume: 'cașcaval', cantitate: 70, unitate: 'g' },
          { id: 'd11-m1-i3', nume: 'roșii', cantitate: 200, unitate: 'g' },
          { id: 'd11-m1-i4', nume: 'ulei de măsline', cantitate: 10, unitate: 'g' },
          { id: 'd11-m1-i5', nume: 'iaurt grecesc 10%', cantitate: 100, unitate: 'g' }
        ],
        reteta: {
          pasi: [
            'Bate ouăle și condimentează.',
            'Gătește omleta în ulei 6-8 minute.',
            'Adaugă cașcavalul și mai lasă 1-2 minute.',
            'Servește cu roșii și iaurt.'
          ],
          prepMinute: 6,
          cookMinute: 10
        }
      },
      masa2: {
        id: 'd11-m2',
        titlu: 'Salată standard cu curcan',
        oraImplicita: '19:00',
        caloriiEstimate: 800,
        ingrediente: [
          { id: 'd11-m2-i1', nume: 'curcan gătit', cantitate: 200, unitate: 'g' },
          { id: 'd11-m2-i2', nume: 'roșii', cantitate: 300, unitate: 'g' },
          { id: 'd11-m2-i3', nume: 'castraveți', cantitate: 200, unitate: 'g' },
          { id: 'd11-m2-i4', nume: 'ceapă', cantitate: 40, unitate: 'g' },
          { id: 'd11-m2-i5', nume: 'nuci', cantitate: 35, unitate: 'g', note: 'nuci românești' },
          { id: 'd11-m2-i6', nume: 'iaurt grecesc 10%', cantitate: 150, unitate: 'g' },
          { id: 'd11-m2-i7', nume: 'ulei de măsline', cantitate: 10, unitate: 'g' },
          { id: 'd11-m2-i8', nume: 'lămâie (suc)', cantitate: 30, unitate: 'g' }
        ],
        reteta: {
          pasi: [
            'Taie legumele și pregătește dressingul.',
            'Adaugă curcanul feliat și nucile.',
            'Toarnă dressingul și amestecă.'
          ],
          prepMinute: 10,
          cookMinute: 0
        }
      }
    },
    {
      index: 12,
      masa1: {
        id: 'd12-m1',
        titlu: 'Quiche cu porc (1 porție)',
        oraImplicita: '12:00',
        caloriiEstimate: 950,
        ingrediente: [
          { id: 'd12-m1-i1', nume: 'ouă', cantitate: 2, unitate: 'buc' },
          { id: 'd12-m1-i2', nume: 'smântână 30%', cantitate: 100, unitate: 'ml' },
          { id: 'd12-m1-i3', nume: 'porc slab gătit', cantitate: 125, unitate: 'g' },
          { id: 'd12-m1-i4', nume: 'cașcaval', cantitate: 60, unitate: 'g' },
          { id: 'd12-m1-i5', nume: 'ceapă', cantitate: 25, unitate: 'g' },
          { id: 'd12-m1-i6', nume: 'ulei de măsline', cantitate: 5, unitate: 'g' }
        ],
        reteta: {
          pasi: [
            'Preîncălzește cuptorul la 180°C.',
            'Sotează ceapa 3 minute în ulei, adaugă porcul 2 minute.',
            'Bate ouăle cu smântâna și condimentează.',
            'Adaugă cașcavalul și porcul.',
            'Coace 35-40 minute.'
          ],
          prepMinute: 12,
          cookMinute: 40
        }
      },
      masa2: {
        id: 'd12-m2',
        titlu: 'Salată standard cu pui',
        oraImplicita: '19:00',
        caloriiEstimate: 800,
        ingrediente: [
          { id: 'd12-m2-i1', nume: 'pui gătit', cantitate: 200, unitate: 'g' },
          { id: 'd12-m2-i2', nume: 'roșii', cantitate: 300, unitate: 'g' },
          { id: 'd12-m2-i3', nume: 'castraveți', cantitate: 200, unitate: 'g' },
          { id: 'd12-m2-i4', nume: 'ceapă', cantitate: 40, unitate: 'g' },
          { id: 'd12-m2-i5', nume: 'nuci', cantitate: 35, unitate: 'g', note: 'nuci românești' },
          { id: 'd12-m2-i6', nume: 'iaurt grecesc 10%', cantitate: 150, unitate: 'g' },
          { id: 'd12-m2-i7', nume: 'ulei de măsline', cantitate: 10, unitate: 'g' },
          { id: 'd12-m2-i8', nume: 'lămâie (suc)', cantitate: 30, unitate: 'g' }
        ],
        reteta: {
          pasi: [
            'Taie legumele și pregătește dressingul.',
            'Adaugă puiul și nucile.',
            'Toarnă dressingul și amestecă.'
          ],
          prepMinute: 10,
          cookMinute: 0
        }
      }
    },
    {
      index: 13,
      masa1: {
        id: 'd13-m1',
        titlu: 'Brânză de vaci grasă + ouă + nuci',
        oraImplicita: '12:00',
        caloriiEstimate: 920,
        ingrediente: [
          { id: 'd13-m1-i1', nume: 'brânză de vaci grasă', cantitate: 250, unitate: 'g' },
          { id: 'd13-m1-i2', nume: 'ouă', cantitate: 2, unitate: 'buc' },
          { id: 'd13-m1-i3', nume: 'nuci', cantitate: 30, unitate: 'g' },
          { id: 'd13-m1-i4', nume: 'castravete', cantitate: 200, unitate: 'g' },
          { id: 'd13-m1-i5', nume: 'ardei', cantitate: 150, unitate: 'g' }
        ],
        reteta: {
          pasi: [
            'Fierbe ouăle 10 minute sau fă-le ochiuri.',
            'Servește brânza de vaci cu legume și nuci.',
            'Adaugă ouăle alături.'
          ],
          prepMinute: 8,
          cookMinute: 10
        }
      },
      masa2: {
        id: 'd13-m2',
        titlu: 'Salată standard cu porc slab',
        oraImplicita: '19:00',
        caloriiEstimate: 830,
        ingrediente: [
          { id: 'd13-m2-i1', nume: 'porc slab gătit', cantitate: 190, unitate: 'g' },
          { id: 'd13-m2-i2', nume: 'roșii', cantitate: 300, unitate: 'g' },
          { id: 'd13-m2-i3', nume: 'castraveți', cantitate: 200, unitate: 'g' },
          { id: 'd13-m2-i4', nume: 'ceapă', cantitate: 40, unitate: 'g' },
          { id: 'd13-m2-i5', nume: 'nuci', cantitate: 35, unitate: 'g', note: 'nuci românești' },
          { id: 'd13-m2-i6', nume: 'iaurt grecesc 10%', cantitate: 150, unitate: 'g' },
          { id: 'd13-m2-i7', nume: 'ulei de măsline', cantitate: 10, unitate: 'g' },
          { id: 'd13-m2-i8', nume: 'lămâie (suc)', cantitate: 30, unitate: 'g' }
        ],
        reteta: {
          pasi: [
            'Taie legumele și fă dressingul.',
            'Adaugă porcul feliat și nucile.',
            'Toarnă dressingul și amestecă.'
          ],
          prepMinute: 10,
          cookMinute: 0
        }
      }
    },
    {
      index: 14,
      masa1: {
        id: 'd14-m1',
        titlu: 'Friptură de vită + ciuperci',
        oraImplicita: '12:00',
        caloriiEstimate: 980,
        ingrediente: [
          { id: 'd14-m1-i1', nume: 'vită', cantitate: 250, unitate: 'g' },
          { id: 'd14-m1-i2', nume: 'ciuperci', cantitate: 300, unitate: 'g' },
          { id: 'd14-m1-i3', nume: 'ceapă', cantitate: 50, unitate: 'g' },
          { id: 'd14-m1-i4', nume: 'ulei de măsline', cantitate: 10, unitate: 'g' },
          { id: 'd14-m1-i5', nume: 'brânză maturată', cantitate: 40, unitate: 'g' }
        ],
        reteta: {
          pasi: [
            'Gătește vita la grill sau tigaie 4-6 minute pe fiecare parte.',
            'Sotează ciupercile și ceapa 6-8 minute în ulei.',
            'Servește cu brânză maturată.'
          ],
          prepMinute: 10,
          cookMinute: 15
        }
      },
      masa2: {
        id: 'd14-m2',
        titlu: 'Salată standard cu pui',
        oraImplicita: '19:00',
        caloriiEstimate: 800,
        ingrediente: [
          { id: 'd14-m2-i1', nume: 'pui gătit', cantitate: 200, unitate: 'g' },
          { id: 'd14-m2-i2', nume: 'roșii', cantitate: 300, unitate: 'g' },
          { id: 'd14-m2-i3', nume: 'castraveți', cantitate: 200, unitate: 'g' },
          { id: 'd14-m2-i4', nume: 'ceapă', cantitate: 40, unitate: 'g' },
          { id: 'd14-m2-i5', nume: 'nuci', cantitate: 35, unitate: 'g', note: 'nuci românești' },
          { id: 'd14-m2-i6', nume: 'iaurt grecesc 10%', cantitate: 150, unitate: 'g' },
          { id: 'd14-m2-i7', nume: 'ulei de măsline', cantitate: 10, unitate: 'g' },
          { id: 'd14-m2-i8', nume: 'lămâie (suc)', cantitate: 30, unitate: 'g' }
        ],
        reteta: {
          pasi: [
            'Taie legumele.',
            'Amestecă iaurtul cu uleiul și lămâia pentru dressing.',
            'Adaugă puiul feliat și nucile.',
            'Toarnă dressingul și amestecă ușor.'
          ],
          prepMinute: 10,
          cookMinute: 0
        }
      }
    }
  ]
};
