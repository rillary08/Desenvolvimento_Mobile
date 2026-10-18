import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

// Imagens ausentes ou que não representam com segurança o item ficam sem foto.
const BIOMES = [
  {
    id: 'amazonia',
    name: 'Amazônia',
    image: require('./assets/biomas/amazonia.jpg'),
    description:
      'A Amazônia ocupa grande parte do norte do Brasil e reúne a maior floresta tropical do país. A região é atravessada por rios extensos, recebe chuvas abundantes e abriga enorme diversidade de plantas e animais. Sua vegetação influencia os ciclos de água e o clima em diferentes partes da América do Sul.',
    region: 'Norte do Brasil',
    climate: 'Equatorial, quente e úmido, com chuvas frequentes.',
    territory: 'Consultar mapa oficial do IBGE (edição 2025).',
    animals: [
      {
        id: 'onca-pintada',
        name: 'Onça-pintada',
        scientific: 'Panthera onca',
        image: require('./assets/animais/onca-pintada.jpg'),
        description:
          'A onça-pintada é o maior felino das Américas e tem pelagem amarela com rosetas escuras. É uma predadora de topo, excelente nadadora e pode viver em florestas, áreas alagáveis e outros ambientes com água e cobertura vegetal. A perda de habitat e os conflitos com pessoas são ameaças importantes.',
        diet: 'Carnívora; caça mamíferos, répteis e peixes.',
        habitat: 'Florestas, margens de rios e áreas alagáveis.',
        conservation: 'Quase ameaçada (IUCN, 2016).',
        source: 'IUCN Red List — avaliação global de 2016',
      },
      {
        id: 'boto-cor-de-rosa',
        name: 'Boto-cor-de-rosa',
        scientific: 'Inia geoffrensis',
        image: require('./assets/animais/boto-cor-de-rosa.jpg'),
        description:
          'O boto-cor-de-rosa é um golfinho de água doce encontrado nas bacias amazônicas. Seu focinho comprido ajuda a capturar peixes entre raízes e galhos submersos, e o pescoço flexível facilita manobras em áreas inundadas. A espécie enfrenta riscos associados à captura acidental, poluição e alterações dos rios.',
        diet: 'Principalmente peixes; também pode consumir crustáceos.',
        habitat: 'Rios, lagos e florestas inundadas da Amazônia.',
        conservation: 'Em perigo (IUCN, 2018).',
        source: 'IUCN Red List — avaliação global de 2018',
      },
    ],
  },
  {
    id: 'cerrado',
    name: 'Cerrado',
    image: require('./assets/biomas/cerrado.jpg'),
    description:
      'O Cerrado é uma vasta savana tropical do Brasil central, com campos, árvores retorcidas, matas de galeria e veredas. Tem estação seca e estação chuvosa bem marcadas. Suas nascentes alimentam importantes bacias hidrográficas, e muitas plantas possuem adaptações a solos pobres, fogo natural e períodos sem chuva.',
    region: 'Brasil central, sobretudo Centro-Oeste e partes do Sudeste, Norte e Nordeste',
    climate: 'Tropical sazonal, com verão chuvoso e inverno seco.',
    territory: 'Consultar mapa oficial do IBGE (edição 2025).',
    animals: [
      {
        id: 'lobo-guara',
        name: 'Lobo-guará',
        scientific: 'Chrysocyon brachyurus',
        image: require('./assets/animais/lobo-guara.jpg'),
        description:
          'O lobo-guará é o maior canídeo da América do Sul. Suas pernas longas ajudam a caminhar pela vegetação alta, e sua dieta inclui frutos, especialmente a lobeira, além de pequenos animais. A espécie vive em áreas abertas e depende de paisagens suficientemente conectadas para buscar alimento e parceiros.',
        diet: 'Onívoro; frutos, pequenos mamíferos, aves e insetos.',
        habitat: 'Cerrados, campos e áreas abertas com vegetação nativa.',
        conservation: 'Quase ameaçado (IUCN, 2015; avaliação precisa atualização).',
        source: 'IUCN Red List — avaliação global de 2015, marcada como precisando de atualização',
      },
      {
        id: 'tamandua-bandeira',
        name: 'Tamanduá-bandeira',
        scientific: 'Myrmecophaga tridactyla',
        image: require('./assets/animais/tamandua-bandeira.jpg'),
        description:
          'O tamanduá-bandeira tem focinho comprido, língua pegajosa e uma cauda volumosa, características que o ajudam a procurar formigas e cupins. Não possui dentes e usa garras fortes para abrir ninhos. Incêndios, atropelamentos e perda de áreas naturais estão entre os riscos enfrentados pela espécie.',
        diet: 'Formigas e cupins.',
        habitat: 'Savanas, campos, florestas e áreas úmidas.',
        conservation: 'Vulnerável (IUCN, 2024).',
        source: 'IUCN Red List — avaliação global de 2024',
      },
    ],
  },
  {
    id: 'mata-atlantica',
    name: 'Mata Atlântica',
    image: require('./assets/biomas/mata-atlantica.jpg'),
    description:
      'A Mata Atlântica acompanha grande parte da costa brasileira e também ocorre em áreas interiores. Inclui florestas úmidas, matas de altitude, restingas e manguezais. Embora muito fragmentada por ocupação humana, conserva espécies que não existem naturalmente em outros lugares e protege nascentes importantes para numerosas cidades.',
    region: 'Faixa litorânea do Nordeste ao Sul, com áreas interiores',
    climate: 'Predominantemente tropical úmido; varia com latitude e altitude.',
    territory: 'Consultar mapa oficial do IBGE (edição 2025).',
    animals: [
      {
        id: 'mico-leao-dourado',
        name: 'Mico-leão-dourado',
        scientific: 'Leontopithecus rosalia',
        image: require('./assets/animais/mico-leao-dourado.jpg'),
        description:
          'O mico-leão-dourado é um pequeno primata de pelagem alaranjada, endêmico da Mata Atlântica do estado do Rio de Janeiro. Vive em grupos familiares e usa cavidades de árvores para abrigo. A conservação depende da proteção e conexão de fragmentos florestais e de ações de manejo da espécie.',
        diet: 'Frutos, insetos, pequenos vertebrados e néctar.',
        habitat: 'Florestas baixas da Mata Atlântica no Rio de Janeiro.',
        conservation: 'Em perigo (IUCN, 2015; avaliação precisa atualização).',
        source: 'IUCN Red List — avaliação global de 2015, marcada como precisando de atualização',
      },
      {
        id: 'tucano',
        name: 'Tucano-toco',
        scientific: 'Ramphastos toco',
        image: require('./assets/animais/tucano.jpg'),
        description:
          'O tucano-toco é reconhecido pelo bico grande e colorido, que é leve apesar do tamanho. Alimenta-se principalmente de frutos, mas também consome ovos e pequenos animais. Pode dispersar sementes ao se deslocar entre áreas de alimentação. Ocorre em diferentes paisagens arborizadas da América do Sul.',
        diet: 'Frutos, ovos, insetos e pequenos vertebrados.',
        habitat: 'Matas, bordas florestais e áreas arborizadas abertas.',
        conservation: 'Pouco preocupante (IUCN, 2025).',
        source: 'IUCN Red List — avaliação global de 2025',
      },
    ],
  },
  {
    id: 'caatinga',
    name: 'Caatinga',
    image: require('./assets/biomas/caatinga.jpg'),
    description:
      'A Caatinga é um bioma exclusivamente brasileiro, predominante no interior do Nordeste. Seu clima é semiárido, com chuvas irregulares e longos períodos secos. Muitas plantas perdem as folhas na estiagem, e animais apresentam adaptações para economizar água e aproveitar os recursos disponíveis após as chuvas.',
    region: 'Interior do Nordeste e norte de Minas Gerais',
    climate: 'Semiárido, quente e com chuvas irregulares.',
    territory: 'Consultar mapa oficial do IBGE (edição 2025).',
    animals: [
      {
        id: 'ararinha-azul',
        name: 'Ararinha-azul',
        scientific: 'Cyanopsitta spixii',
        image: require('./assets/animais/ararinha-azul.jpg'),
        description:
          'A ararinha-azul é uma arara nativa do Brasil, associada a florestas secas e arbustais da Caatinga. A captura e a perda de habitat contribuíram para seu desaparecimento na natureza. A espécie é mantida em programas de conservação sob cuidados humanos e está classificada como extinta na natureza pela IUCN.',
        diet: 'Sementes e frutos de plantas nativas.',
        habitat: 'Florestas secas e arbustais do Nordeste brasileiro; atualmente depende de manejo e reintrodução.',
        conservation: 'Extinta na natureza (IUCN, 2019).',
        source: 'IUCN Red List — avaliação global de 2019',
      },
      {
        id: 'tatu-bola',
        name: 'Tatu-bola-da-caatinga',
        scientific: 'Tolypeutes tricinctus',
        image: require('./assets/animais/tatu-bola.jpg'),
        description:
          'O tatu-bola-da-caatinga é um pequeno tatu brasileiro capaz de enrolar o corpo e fechar a carapaça como defesa. Alimenta-se de insetos e outros invertebrados e utiliza áreas de vegetação nativa para buscar abrigo e alimento. Caça e conversão do habitat ameaçam suas populações.',
        diet: 'Insetos e outros pequenos invertebrados.',
        habitat: 'Caatinga e áreas de Cerrado próximas.',
        conservation: 'Vulnerável (IUCN, 2013; avaliação precisa atualização).',
        source: 'IUCN Red List — avaliação global de 2013, marcada como precisando de atualização',
      },
    ],
  },
  {
    id: 'pantanal',
    name: 'Pantanal',
    image: require('./assets/biomas/pantanal.jpg'),
    description:
      'O Pantanal é uma grande planície alagável no Centro-Oeste, marcada por cheias e secas sazonais. Rios e áreas inundadas sustentam ambientes variados, como campos, matas e lagoas. A fauna é abundante e acompanha o pulso das águas, que influencia a disponibilidade de alimento e os deslocamentos dos animais.',
    region: 'Mato Grosso e Mato Grosso do Sul',
    climate: 'Tropical continental, com estação chuvosa e período seco.',
    territory: 'Consultar mapa oficial do IBGE (edição 2025).',
    animals: [
      {
        id: 'jacare-do-pantanal',
        name: 'Jacaré-do-pantanal',
        scientific: 'Caiman yacare',
        image: require('./assets/animais/jacare-do-pantanal.jpg'),
        description:
          'O jacaré-do-pantanal é um réptil semiaquático que vive em rios, lagoas e áreas inundadas do Centro da América do Sul. Alimenta-se de peixes e outros animais aquáticos. Durante a seca, pode concentrar-se em corpos d’água remanescentes, onde encontra abrigo e alimento.',
        diet: 'Peixes, crustáceos e outros animais aquáticos.',
        habitat: 'Rios, lagoas, baías e áreas alagáveis do Pantanal.',
        conservation: 'Pouco preocupante (IUCN, 2019).',
        source: 'IUCN Red List — avaliação global de 2019',
      },
      {
        id: 'tuiuiu',
        name: 'Tuiuiú',
        scientific: 'Jabiru mycteria',
        image: require('./assets/animais/tuiuiu.jpg'),
        description:
          'O tuiuiú é uma grande ave de áreas úmidas, símbolo do Pantanal. Tem corpo branco, pescoço preto e uma faixa vermelha na base do pescoço. Constrói ninhos volumosos em árvores e se alimenta em águas rasas, capturando peixes, anfíbios e outros pequenos animais.',
        diet: 'Peixes, anfíbios, répteis e pequenos invertebrados.',
        habitat: 'Brejos, lagoas, margens de rios e campos alagáveis.',
        conservation: 'Pouco preocupante (IUCN, 2019).',
        source: 'IUCN Red List — avaliação global de 2019',
      },
    ],
  },
  {
    id: 'pampa',
    name: 'Pampa',
    image: require('./assets/biomas/pampa.jpg'),
    description:
      'O Pampa brasileiro ocorre no Rio Grande do Sul e é formado principalmente por campos naturais, com gramíneas, ervas e arbustos. A paisagem aberta abriga espécies adaptadas a áreas campestres e possui grande diversidade de plantas. Agricultura, silvicultura e conversão dos campos alteram esse ambiente.',
    region: 'Sul do Rio Grande do Sul',
    climate: 'Subtropical, com estações do ano bem definidas.',
    territory: 'Consultar mapa oficial do IBGE (edição 2025).',
    animals: [
      {
        id: 'quero-quero',
        name: 'Quero-quero',
        scientific: 'Vanellus chilensis',
        image: require('./assets/animais/quero-quero.jpg'),
        description:
          'O quero-quero é uma ave comum em campos abertos e áreas úmidas da América do Sul. Possui esporões nas asas e costuma vocalizar quando percebe intrusos perto do ninho. Alimenta-se no solo e se adapta a campos naturais, pastagens e ambientes modificados, embora dependa de locais adequados para nidificar.',
        diet: 'Insetos e outros invertebrados encontrados no solo.',
        habitat: 'Campos, pastagens, margens de lagoas e áreas abertas.',
        conservation: 'Pouco preocupante (IUCN, 2019).',
        source: 'IUCN Red List — avaliação global de 2019',
      },
      {
        id: 'veado-campeiro',
        name: 'Veado-campeiro',
        scientific: 'Ozotoceros bezoarticus',
        image: require('./assets/animais/veado-campeiro.jpg'),
        description:
          'O veado-campeiro é um cervídeo de áreas abertas que ocorre em campos e savanas da América do Sul. Alimenta-se de plantas e costuma permanecer alerta em paisagens com boa visibilidade. A perda e fragmentação dos campos naturais reduzem áreas adequadas para abrigo, alimentação e deslocamento.',
        diet: 'Gramíneas, folhas e outras plantas.',
        habitat: 'Campos naturais e savanas abertas.',
        conservation: 'Quase ameaçado (IUCN, 2015; avaliação precisa atualização).',
        source: 'IUCN Red List — avaliação global de 2015, marcada como precisando de atualização',
      },
    ],
  },
];

const ALL_ANIMALS = BIOMES.flatMap((biome) =>
  biome.animals.map((animal) => ({ ...animal, biomeName: biome.name })),
);

// Proporções largura/altura dos JPEGs usados nas capas e detalhes.
const IMAGE_ASPECT_RATIOS = {
  amazonia: 1.5,
  cerrado: 1.333,
  'mata-atlantica': 1.493,
  caatinga: 1.778,
  pantanal: 1.486,
  pampa: 1.333,
  'onca-pintada': 1.5,
  'boto-cor-de-rosa': 1.333,
  'lobo-guara': 1.333,
  'tamandua-bandeira': 1.5,
  'mico-leao-dourado': 1.543,
  tucano: 1.5,
  'ararinha-azul': 1.361,
  'tatu-bola': 1.333,
  'jacare-do-pantanal': 1.5,
  tuiuiu: 1,
  'quero-quero': 1.333,
  'veado-campeiro': 1.5,
};

const INITIAL_FORM = {
  name: '',
  email: '',
  city: '',
  observation: '',
  favoriteBiome: BIOMES[0].id,
  favoriteAnimal: ALL_ANIMALS[0].id,
  sightings: 0,
  rating: 5,
  visited: false,
  conservationTips: false,
};

export default function App() {
  const [activeTab, setActiveTab] = useState('biomes');
  const [screen, setScreen] = useState('list');
  const [selectedBiome, setSelectedBiome] = useState(null);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [formError, setFormError] = useState('');
  const [submittedRecord, setSubmittedRecord] = useState(null);

  const openBiome = (biome) => {
    setSelectedBiome(biome);
    setScreen('biome');
  };

  const openAnimal = (animal) => {
    setSelectedAnimal(animal);
    setScreen('animal');
  };

  const goBack = () => {
    if (screen === 'animal') {
      setScreen('biome');
    } else {
      setScreen('list');
      setSelectedBiome(null);
    }
  };

  const changeTab = (tab) => {
    setActiveTab(tab);
    setScreen('list');
    setSelectedBiome(null);
    setSelectedAnimal(null);
  };

  const updateForm = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (field === 'name' && value.trim()) setFormError('');
  };

  const clearForm = () => {
    setForm({ ...INITIAL_FORM });
    setFormError('');
    setSubmittedRecord(null);
  };

  const submitForm = () => {
    if (!form.name.trim()) {
      setFormError('Informe seu nome para enviar o registro.');
      setSubmittedRecord(null);
      return;
    }
    setFormError('');
    setSubmittedRecord({ ...form, name: form.name.trim() });
  };

  const pageTitle =
    activeTab === 'diary'
      ? 'Diário de Observação'
      : screen === 'animal'
        ? 'Animal'
        : screen === 'biome'
          ? 'Bioma'
          : 'Biomas do Brasil';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F1F5F0" barStyle="dark-content" />
      <View style={styles.appShell}>
        <View style={styles.header}>
          {activeTab === 'biomes' && screen !== 'list' ? (
            <TouchableOpacity accessibilityRole="button" onPress={goBack} style={styles.backButton}>
              <Text style={styles.backText}>←</Text>
            </TouchableOpacity>
          ) : null}
          <Text style={styles.headerTitle}>{pageTitle}</Text>
          {activeTab === 'biomes' && screen !== 'list' ? <View style={styles.headerSpacer} /> : null}
        </View>

        <View style={styles.content}>
          {activeTab === 'diary' ? (
            <DiaryScreen
              form={form}
              formError={formError}
              submittedRecord={submittedRecord}
              updateForm={updateForm}
              clearForm={clearForm}
              submitForm={submitForm}
            />
          ) : screen === 'animal' && selectedAnimal ? (
            <AnimalScreen animal={selectedAnimal} />
          ) : screen === 'biome' && selectedBiome ? (
            <BiomeScreen biome={selectedBiome} openAnimal={openAnimal} />
          ) : (
            <BiomeList openBiome={openBiome} />
          )}
        </View>

        <View style={styles.tabBar}>
          <TouchableOpacity
            accessibilityRole="tab"
            accessibilityState={{ selected: activeTab === 'biomes' }}
            onPress={() => changeTab('biomes')}
            style={styles.tabButton}
          >
            <Text style={[styles.tabIcon, activeTab === 'biomes' && styles.activeTabText]}>⌂</Text>
            <Text style={[styles.tabLabel, activeTab === 'biomes' && styles.activeTabText]}>Biomas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityRole="tab"
            accessibilityState={{ selected: activeTab === 'diary' }}
            onPress={() => changeTab('diary')}
            style={styles.tabButton}
          >
            <Text style={[styles.tabIcon, activeTab === 'diary' && styles.activeTabText]}>▤</Text>
            <Text style={[styles.tabLabel, activeTab === 'diary' && styles.activeTabText]}>Diário</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

function LocalPhoto({ source, style, label, aspectRatio, resizeMode = 'cover' }) {
  const frameStyle = [styles.photoFrame, style, aspectRatio ? { aspectRatio } : null];

  if (source) {
    return (
      <View style={frameStyle}>
        <Image
          accessibilityLabel={label}
          resizeMode={resizeMode}
          source={source}
          style={[styles.photoFill, Platform.OS === 'web' ? { objectFit: resizeMode } : null]}
        />
      </View>
    );
  }
  return (
    <View style={[frameStyle, styles.photoPlaceholder]}>
      <Text style={styles.placeholderTitle}>Foto indisponível</Text>
      <Text style={styles.placeholderSubtitle}>Imagem local ainda não adicionada</Text>
    </View>
  );
}

function BiomeList({ openBiome }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.featureCard}>
        <LocalPhoto
          aspectRatio={IMAGE_ASPECT_RATIOS.amazonia}
          label="Paisagem da Amazônia"
          source={BIOMES[0].image}
          style={styles.featureImage}
        />
        <View style={styles.featureContent}>
          <Text style={styles.eyebrow}>NATUREZA BRASILEIRA</Text>
          <Text style={styles.introTitle}>Biomas do Brasil</Text>
          <Text style={styles.bodyText}>
            O Brasil reúne paisagens diversas, de florestas úmidas a campos e áreas alagadas. Cada bioma abriga espécies adaptadas às suas condições naturais.
          </Text>
        </View>
      </View>
      <View style={styles.homeInfoCard}>
        <InfoRow label="Total de biomas" value="6" />
        <InfoRow label="Animais catalogados" value="12" />
        <InfoRow label="Região" value="Brasil" />
        <InfoRow label="Tema" value="Fauna dos biomas brasileiros" />
      </View>
      <Text style={styles.sectionHeading}>Biomas</Text>
      {BIOMES.map((biome) => (
        <TouchableOpacity
          accessibilityRole="button"
          key={biome.id}
          onPress={() => openBiome(biome)}
          style={styles.biomeCard}
        >
          <LocalPhoto label={biome.name} source={biome.image} style={styles.biomeThumbnail} />
          <View style={styles.biomeCardText}>
            <Text style={styles.cardTitle}>{biome.name}</Text>
            <Text numberOfLines={3} style={styles.cardDescription}>{biome.description}</Text>
          </View>
          <Text style={styles.chevron}>&gt;</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function BiomeScreen({ biome, openAnimal }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <LocalPhoto
        aspectRatio={IMAGE_ASPECT_RATIOS[biome.id]}
        label={biome.name}
        source={biome.image}
        style={styles.heroPhoto}
      />
      <Text style={styles.detailTitle}>{biome.name}</Text>
      <Text style={styles.bodyText}>{biome.description}</Text>
      <View style={styles.infoCard}>
        <InfoRow label="Região principal" value={biome.region} />
        <InfoRow label="Clima" value={biome.climate} />
        <InfoRow label="Área territorial" value={biome.territory} />
      </View>
      <Text style={styles.animalsHeading}>Animais</Text>
      {biome.animals.map((animal) => (
        <TouchableOpacity
          accessibilityRole="button"
          key={animal.id}
          onPress={() => openAnimal({ ...animal, biomeName: biome.name })}
          style={styles.animalCard}
        >
          <LocalPhoto label={animal.name} source={animal.image} style={styles.animalThumbnail} />
          <View style={styles.animalCardContent}>
            <Text style={styles.cardTitle}>{animal.name}</Text>
            <Text style={styles.scientificName}>{animal.scientific}</Text>
            <Text numberOfLines={4} style={styles.cardDescription}>{animal.description}</Text>
          </View>
          <Text style={styles.chevron}>&gt;</Text>
        </TouchableOpacity>
      ))}
      <SourceNote text="IBGE, Biomas e Sistema Costeiro-Marinho do Brasil, edição 2025" />
    </ScrollView>
  );
}

function AnimalScreen({ animal }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <LocalPhoto
        aspectRatio={IMAGE_ASPECT_RATIOS[animal.id]}
        label={animal.name}
        source={animal.image}
        style={styles.heroPhoto}
      />
      <Text style={styles.detailTitle}>{animal.name}</Text>
      <Text style={styles.scientificNameLarge}>{animal.scientific}</Text>
      <Text style={styles.bodyText}>{animal.description}</Text>
      <View style={styles.infoCard}>
        {animal.diet ? <InfoRow label="Alimentação" value={animal.diet} /> : null}
        {animal.habitat ? <InfoRow label="Habitat" value={animal.habitat} /> : null}
        {animal.conservation ? <InfoRow label="Estado de conservação" value={animal.conservation} /> : null}
        <InfoRow label="Bioma em destaque" value={animal.biomeName} />
      </View>
      <SourceNote text={animal.source} />
    </ScrollView>
  );
}

function InfoRow({ label, value }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function SourceNote({ text }) {
  return (
    <Text style={styles.sourceNote}>
      Fonte: {text} — consultado em 17/10/2026
    </Text>
  );
}

function DiaryScreen({ form, formError, submittedRecord, updateForm, clearForm, submitForm }) {
  const favoriteBiome = BIOMES.find((biome) => biome.id === form.favoriteBiome)?.name ?? '';
  const favoriteAnimal = ALL_ANIMALS.find((animal) => animal.id === form.favoriteAnimal)?.name ?? '';

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.flex}
    >
      <ScrollView
        contentContainerStyle={styles.diaryContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.diaryLead}>Registre um passeio e suas observações da natureza.</Text>
        <FormField label="Nome">
          <TextInput
            accessibilityLabel="Nome"
            onChangeText={(value) => updateForm('name', value)}
            placeholder="Seu nome"
            style={styles.textInput}
            value={form.name}
          />
        </FormField>
        <FormField label="E-mail">
          <TextInput
            accessibilityLabel="E-mail"
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={(value) => updateForm('email', value)}
            placeholder="voce@exemplo.com"
            style={styles.textInput}
            value={form.email}
          />
        </FormField>
        <FormField label="Cidade">
          <TextInput
            accessibilityLabel="Cidade"
            onChangeText={(value) => updateForm('city', value)}
            placeholder="Sua cidade"
            style={styles.textInput}
            value={form.city}
          />
        </FormField>
        <FormField label="Observação">
          <TextInput
            accessibilityLabel="Observação"
            multiline
            onChangeText={(value) => updateForm('observation', value)}
            placeholder="O que chamou sua atenção?"
            style={[styles.textInput, styles.multilineInput]}
            textAlignVertical="top"
            value={form.observation}
          />
        </FormField>
        <FormField label="Bioma favorito">
          <View style={styles.pickerWrap}>
            <Picker
              onValueChange={(value) => updateForm('favoriteBiome', value)}
              selectedValue={form.favoriteBiome}
              style={styles.picker}
            >
              {BIOMES.map((biome) => <Picker.Item key={biome.id} label={biome.name} value={biome.id} />)}
            </Picker>
          </View>
        </FormField>
        <FormField label="Animal favorito">
          <View style={styles.pickerWrap}>
            <Picker
              onValueChange={(value) => updateForm('favoriteAnimal', value)}
              selectedValue={form.favoriteAnimal}
              style={styles.picker}
            >
              {ALL_ANIMALS.map((animal) => (
                <Picker.Item key={animal.id} label={`${animal.name} · ${animal.biomeName}`} value={animal.id} />
              ))}
            </Picker>
          </View>
        </FormField>
        <View style={styles.sliderBlock}>
          <Text style={styles.formLabel}>Animais avistados: <Text style={styles.sliderValue}>{form.sightings}</Text></Text>
          <Slider
            maximumValue={20}
            minimumValue={0}
            onValueChange={(value) => updateForm('sightings', Math.round(value))}
            step={1}
            value={form.sightings}
            minimumTrackTintColor={COLORS.green}
            maximumTrackTintColor={COLORS.border}
            thumbTintColor={COLORS.green}
          />
        </View>
        <View style={styles.sliderBlock}>
          <Text style={styles.formLabel}>Nota do passeio: <Text style={styles.sliderValue}>{form.rating.toFixed(1)}</Text></Text>
          <Slider
            maximumValue={10}
            minimumValue={0}
            onValueChange={(value) => updateForm('rating', Math.round(value * 2) / 2)}
            step={0.5}
            value={form.rating}
            minimumTrackTintColor={COLORS.green}
            maximumTrackTintColor={COLORS.border}
            thumbTintColor={COLORS.green}
          />
        </View>
        <ToggleRow
          label="Já visitei esse bioma?"
          onValueChange={(value) => updateForm('visited', value)}
          value={form.visited}
        />
        <ToggleRow
          label="Quero receber dicas de conservação"
          onValueChange={(value) => updateForm('conservationTips', value)}
          value={form.conservationTips}
        />
        {formError ? <Text accessibilityRole="alert" style={styles.errorText}>{formError}</Text> : null}
        <View style={styles.actionRow}>
          <TouchableOpacity accessibilityRole="button" onPress={submitForm} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Enviar</Text>
          </TouchableOpacity>
          <TouchableOpacity accessibilityRole="button" onPress={clearForm} style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Limpar</Text>
          </TouchableOpacity>
        </View>
        {submittedRecord ? (
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Resumo do registro</Text>
            <InfoRow label="Nome" value={submittedRecord.name || '—'} />
            <InfoRow label="E-mail" value={submittedRecord.email || '—'} />
            <InfoRow label="Cidade" value={submittedRecord.city || '—'} />
            <InfoRow label="Observação" value={submittedRecord.observation || '—'} />
            <InfoRow label="Bioma favorito" value={favoriteBiome} />
            <InfoRow label="Animal favorito" value={favoriteAnimal} />
            <InfoRow label="Animais avistados" value={String(submittedRecord.sightings)} />
            <InfoRow label="Nota do passeio" value={submittedRecord.rating.toFixed(1)} />
            <InfoRow label="Já visitou" value={submittedRecord.visited ? 'Sim' : 'Não'} />
            <InfoRow label="Quer dicas" value={submittedRecord.conservationTips ? 'Sim' : 'Não'} />
          </View>
        ) : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function FormField({ label, children }) {
  return (
    <View style={styles.formField}>
      <Text style={styles.formLabel}>{label}</Text>
      {children}
    </View>
  );
}

function ToggleRow({ label, value, onValueChange }) {
  return (
    <View style={styles.toggleRow}>
      <Text style={styles.toggleLabel}>{label}</Text>
      <Switch
        onValueChange={onValueChange}
        thumbColor={value ? COLORS.green : '#F8FAF8'}
        trackColor={{ false: '#C9D2C8', true: '#A5C8A6' }}
        value={value}
      />
    </View>
  );
}

const COLORS = {
  background: '#F1F5F0',
  green: '#2E7D32',
  text: '#233126',
  muted: '#617064',
  border: '#D5DDD4',
  white: '#FFFFFF',
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  appShell: { flex: 1 },
  flex: { flex: 1 },
  header: {
    minHeight: 58,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: { flex: 1, color: COLORS.text, fontSize: 21, fontWeight: '700', textAlign: 'center' },
  backButton: { width: 42, height: 42, alignItems: 'flex-start', justifyContent: 'center' },
  backText: { color: COLORS.green, fontSize: 30, lineHeight: 34 },
  headerSpacer: { width: 42 },
  content: { flex: 1 },
  scrollContent: { paddingHorizontal: 18, paddingTop: 8, paddingBottom: 28 },
  introCard: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    marginBottom: 22,
  },
  featureCard: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 14,
  },
  featureImage: { width: '100%' },
  featureContent: { padding: 16 },
  homeInfoCard: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 22,
  },
  eyebrow: { color: COLORS.green, fontSize: 11, fontWeight: '800', marginBottom: 8 },
  introTitle: { color: COLORS.text, fontSize: 22, lineHeight: 29, fontWeight: '700', marginBottom: 9 },
  bodyText: { color: COLORS.muted, fontSize: 15, lineHeight: 23 },
  sectionHeading: { color: COLORS.text, fontSize: 20, fontWeight: '700', marginBottom: 12 },
  biomeCard: {
    minHeight: 124,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 11,
    padding: 10,
  },
  biomeThumbnail: { width: 92, height: 92, borderRadius: 10, marginRight: 12, overflow: 'hidden' },
  biomeCardText: { flex: 1, alignSelf: 'center' },
  cardTitle: { color: COLORS.text, fontSize: 16, fontWeight: '700', marginBottom: 4 },
  cardDescription: { color: COLORS.muted, fontSize: 12, lineHeight: 17 },
  chevron: { color: COLORS.green, fontSize: 25, fontWeight: '500', paddingHorizontal: 5 },
  photoPlaceholder: {
    backgroundColor: '#E4ECE3',
    borderColor: COLORS.border,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  photoFrame: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#E8EEE7',
  },
  photoFill: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  placeholderTitle: { color: COLORS.green, fontSize: 13, fontWeight: '700', textAlign: 'center' },
  placeholderSubtitle: { color: COLORS.muted, fontSize: 10, textAlign: 'center', marginTop: 4 },
  heroPhoto: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#E8EEE7',
    marginBottom: 18,
  },
  detailTitle: { color: COLORS.text, fontSize: 25, fontWeight: '800', marginBottom: 8 },
  infoCard: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginTop: 17,
    marginBottom: 22,
  },
  infoRow: { paddingVertical: 11, borderBottomColor: '#E8EDE7', borderBottomWidth: StyleSheet.hairlineWidth },
  infoLabel: { color: COLORS.muted, fontSize: 12, fontWeight: '600', marginBottom: 3 },
  infoValue: { color: COLORS.text, fontSize: 14, lineHeight: 20 },
  sourceNote: { color: COLORS.muted, fontSize: 11, lineHeight: 16, marginTop: 8, marginBottom: 14 },
  animalsHeading: { color: COLORS.green, fontSize: 20, fontWeight: '800', textAlign: 'center', marginBottom: 13 },
  animalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 12,
    padding: 10,
  },
  animalThumbnail: { width: 84, height: 84, borderRadius: 10, marginRight: 12, overflow: 'hidden' },
  animalCardContent: { flex: 1 },
  scientificName: { color: COLORS.muted, fontSize: 12, fontStyle: 'italic', marginBottom: 5 },
  scientificNameLarge: { color: COLORS.muted, fontSize: 15, fontStyle: 'italic', marginTop: -4, marginBottom: 12 },
  tabBar: {
    minHeight: 62,
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderTopColor: COLORS.border,
    borderTopWidth: 1,
    paddingBottom: Platform.OS === 'android' ? 2 : 0,
  },
  tabButton: { flex: 1, minHeight: 60, alignItems: 'center', justifyContent: 'center' },
  tabIcon: { color: COLORS.muted, fontSize: 19, lineHeight: 23 },
  tabLabel: { color: COLORS.muted, fontSize: 12, fontWeight: '600', marginTop: 1 },
  activeTabText: { color: COLORS.green, fontWeight: '800' },
  diaryContent: { paddingHorizontal: 18, paddingTop: 10, paddingBottom: 30 },
  diaryLead: { color: COLORS.muted, fontSize: 14, lineHeight: 21, marginBottom: 18 },
  formField: { marginBottom: 14 },
  formLabel: { color: COLORS.text, fontSize: 14, fontWeight: '700', marginBottom: 7 },
  textInput: {
    minHeight: 48,
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 10,
    color: COLORS.text,
    fontSize: 15,
    paddingHorizontal: 13,
    paddingVertical: 11,
  },
  multilineInput: { minHeight: 100 },
  pickerWrap: {
    minHeight: 52,
    overflow: 'hidden',
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
  },
  picker: { color: COLORS.text, height: 52, width: '100%' },
  sliderBlock: { marginBottom: 13 },
  sliderValue: { color: COLORS.green, fontWeight: '800' },
  toggleRow: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: COLORS.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 5,
  },
  toggleLabel: { flex: 1, color: COLORS.text, fontSize: 14, fontWeight: '600', paddingRight: 10 },
  errorText: { color: '#B42318', fontSize: 13, fontWeight: '600', marginVertical: 10 },
  actionRow: { flexDirection: 'row', gap: 10, marginTop: 16, marginBottom: 8 },
  primaryButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: 10,
    backgroundColor: COLORS.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: { color: COLORS.white, fontSize: 15, fontWeight: '800' },
  secondaryButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: 10,
    borderColor: COLORS.green,
    borderWidth: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: { color: COLORS.green, fontSize: 15, fontWeight: '800' },
  summaryCard: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 4,
    marginTop: 16,
  },
  summaryTitle: { color: COLORS.green, fontSize: 18, fontWeight: '800', marginBottom: 8 },
});
