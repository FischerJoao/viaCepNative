import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Button, TextInput, List, Provider as PaperProvider } from 'react-native-paper';
import ErrorModal from './components/errorModal';

const estadosBrasileiros = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

function MainApp() {
  //HOOKS
  const [cep, setCep] = useState('');
  const [dados, setDados] = useState([]);
  const [expandedGenero, setExpandedGenero] = useState(false);
  const [expandedEstado, setExpandedEstado] = useState(false);
  const [selectedGenero, setSelectedGenero] = useState(null);
  const [selectedEstado, setSelectedEstado] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  // Função para buscar o CEP
  const buscaCep = (xcep) => {
    let url = `https://viacep.com.br/ws/${xcep}/json/`;

    fetch(url)
      .then((resp) => resp.json())
      .then((xjson) => {
        console.log(xjson);
        setDados(xjson);
      })
      .catch(() => {
        setModalVisible(true);
      });
  };

  return (
    <ScrollView>
      <View>
        <TextInput
          label='Digite seu nome'
          mode='outlined'
          value={nome}
          onChangeText={(text) => setNome(text)}
        />
        <TextInput
          label='Digite seu e-mail'
          mode='outlined'
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <List.Section title='Genero'>
          <List.Accordion
            title={selectedGenero == null ? 'Selecione seu genero' : selectedGenero}
            expanded={expandedGenero}
            onPress={() => setExpandedGenero(!expandedGenero)}
          >
            <List.Item title="Masculino" onPress={() => { setSelectedGenero("Masculino"); setExpandedGenero(false); }} />
            <List.Item title="Feminino" onPress={() => { setSelectedGenero("Feminino"); setExpandedGenero(false); }} />
            <List.Item title="Outro" onPress={() => { setSelectedGenero("Outro"); setExpandedGenero(false); }} />
          </List.Accordion>
        </List.Section>
      </View>
      <View style={styles.container}>
        <TextInput
          label='CEP'
          placeholder='Digite o CEP'
          onChangeText={(x) => setCep(x)}
         // onBlur={() => buscaCep(cep)}
          style={{
            borderColor: 'black',
            borderWidth: 1,
            borderStyle: 'Solid',
            borderRadius: 4,
            margin: 5,
          }}
        />

        <Button
          icon='card-search'
          mode='outlined'
          onPress={() => buscaCep(cep)}
        >
          Buscar
        </Button>

        <TextInput
          label='Rua'
          mode='outlined'
          value={dados.logradouro || ''}
          onChangeText={(value) => setDados({ ...dados, logradouro: value })}
        />
        <TextInput
          label='Bairro'
          mode='outlined'
          value={dados.bairro || ''}
          onChangeText={(value) => setDados({ ...dados, bairro: value })}
        />
        <TextInput
          label='Cidade'
          mode='outlined'
          value={dados.localidade || ''}
          onChangeText={(value) => setDados({ ...dados, localidade: value })}
        />
        <List.Section title='Estado'>
          <List.Accordion
            title={selectedEstado == null ? 'Selecione o Estado' : selectedEstado}
            expanded={expandedEstado}
            onPress={() => setExpandedEstado(!expandedEstado)}
          >
            <ScrollView style={{ maxHeight: 100 }}>
              {estadosBrasileiros.map((estado) => (
                <List.Item key={estado} title={estado} onPress={() => { setSelectedEstado(estado); setExpandedEstado(false); }} />
              ))}
            </ScrollView>
          </List.Accordion>
        </List.Section>


        <Text>{selectedEstado}</Text>

        <Button mode='contained'>Criar usuário</Button>
      </View>

      {/* Modal de Erro */}
      <ErrorModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        message="CEP não existe ou não encontrado"
      />
    </ScrollView>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <MainApp />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 8,
    justifyContent: 'center',
  },
});