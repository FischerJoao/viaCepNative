import { useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Button, TextInput, List } from 'react-native-paper';

const estadosBrasileiros = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

export default function App() {
  //HOOKS
  const [cep, setCep] = useState('');
  let [dados, setDados] = useState([]);
  const [expandedGenero, setExpandedGenero] = useState(false);
  const [expandedEstado, setExpandedEstado] = useState(false);
  const [selectedGenero, setSelectedGenero] = useState(null);
  const [selectedEstado, setSelectedEstado] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  // Função para mudar o estado do accordion de gênero
  const handleAccordionPressGenero = () => setExpandedGenero(!expandedGenero);

  // Função para mudar o estado do accordion de estado
  const handleAccordionPressEstado = () => setExpandedEstado(!expandedEstado);

  // Função para pegar o valor do gênero e mostrar na tela
  const handleItemPressGenero = (x) => {
    setSelectedGenero(x);
    setExpandedGenero(false);
  };

  // Função para pegar o valor do estado e mostrar na tela
  const handleItemPressEstado = (x) => {
    setSelectedEstado(x);
    setExpandedEstado(false);
  };

  const buscaCep = (xcep) => {
    let url = `https://viacep.com.br/ws/${xcep}/json/`;

    fetch(url)
      .then((resp) => {
        return resp.json();
      })
      .then((xjson) => {
        console.log(xjson);
        setDados(xjson);
      })
      .catch(() => {
        window.alert('CEP não existe ou não encontrado');
      });
  };

  return (
    <ScrollView>
      <View>
        <TextInput
          label='Digite seu nome'
          mode='outlined'
          value={dados.nome}
          onChangeText={(text) => setNome(text)}
        />
        <TextInput
          label='Digite seu e-mail'
          mode='outlined'
          value={dados.email}
          onChangeText={(text) => setEmail(text)}
        />
        <List.Section title='Genero'>
          <List.Accordion title={selectedGenero == null ? 'Selecione seu genero' : selectedGenero} expanded={expandedGenero} onPress={handleAccordionPressGenero}>
            <List.Item title="Masculino" onPress={() => { handleItemPressGenero("Masculino") }} />
            <List.Item title="Feminino" onPress={() => { handleItemPressGenero("Feminino") }} />
            <List.Item title="Outro" onPress={() => { handleItemPressGenero("Outro") }} />
          </List.Accordion>
        </List.Section>
      </View>
      <View style={styles.container}>
        <TextInput
        label='CEP'
          placeholder='Digite o CEP'
          onChangeText={(x) => { setCep(x) }}
          style={{
            borderColor: 'black',
            borderWidth: 1,
            borderStyle: 'Solid',
            borderRadius: 4,
            margin: 5,
          }}
        />
        <TextInput
          label='Rua'
          mode='outlined'
          value={dados.logradouro}
          onChangeText={(value) => { setDados({ ...dados, logradouro: value }) }}
        />
        <TextInput
          label='Bairro'
          mode='outlined'
          value={dados.bairro}
          onChangeText={(value) => { setDados({ ...dados, bairro: value }) }}
        />
        <TextInput
          label='Cidade'
          mode='outlined'
          value={dados.localidade}
          onChangeText={(value) => { setDados({ ...dados, localidade: value }) }}
        />
        <List.Section title='Estado'>
          <List.Accordion title={selectedEstado == null ? 'Selecione o Estado' : selectedEstado} expanded={expandedEstado} onPress={handleAccordionPressEstado}>
            <ScrollView style={{ maxHeight: 100 }}>
              {estadosBrasileiros.map((estado) => (
                <List.Item key={estado} title={estado} onPress={() => { handleItemPressEstado(estado) }} />
              ))}
            </ScrollView>
          </List.Accordion>
        </List.Section>

        <Button
          icon='card-search'
          mode='outlined'
          onPress={() => {
            buscaCep(cep);
          }}
        >Buscar</Button>
        <Text>{selectedEstado}</Text>

        <Button
          mode='contained'
        >Criar usuário</Button>

      </View>
    </ScrollView>
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