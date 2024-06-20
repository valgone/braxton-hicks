import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, Text, View, FlatList, StyleSheet, TouchableOpacity, Alert, Modal, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appbar } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
  const [isRunning, setIsRunning] = useState(false); // Indica se o cronômetro está em execução
  const [startTime, setStartTime] = useState(null); // Tempo de início da contração
  const [currentTime, setCurrentTime] = useState(null); // Tempo atual para calcular a duração
  const [contractions, setContractions] = useState([]); // Lista de contrações registradas
  const [modalVisible, setModalVisible] = useState(false); // Visibilidade do modal para selecionar a intensidade
  const [clearModalVisible, setClearModalVisible] = useState(false); // Estado para o modal de confirmação
  const [currentContraction, setCurrentContraction] = useState(null); // Detalhes da contração atual

  const intervalRef = useRef(null);

  // Carrega as contrações salvas do AsyncStorage quando o componente é montado
  useEffect(() => {
    const loadContractions = async () => {
      try {
        const savedContractions = await AsyncStorage.getItem('@contractions');
        if (savedContractions) {
          setContractions(JSON.parse(savedContractions));
        }
      } catch (e) {
        console.error(e);
      }
    };

    loadContractions();
  }, []);

  // Atualiza o tempo atual a cada segundo quando o cronômetro está em execução
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
    } else if (!isRunning && currentTime) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  // Inicia ou pausa o cronômetro
  const startPauseTimer = () => {
    if (isRunning) {
      const endTime = new Date();
      const duration = Math.floor((endTime - startTime) / 1000);
      const newContraction = {
        id: Date.now().toString(),
        start: startTime,
        end: endTime,
        duration: duration,
        intensity: null,
      };
      setCurrentContraction(newContraction);
      setModalVisible(true);
      setIsRunning(false);
    } else {
      setStartTime(new Date());
      setCurrentTime(new Date());
      setIsRunning(true);
    }
  };

  // Salva a contração com a intensidade selecionada
  const saveContraction = async (intensity) => {
    if (currentContraction) {
      const newContraction = { ...currentContraction, intensity: intensity };
      const updatedContractions = [...contractions, newContraction];
      setContractions(updatedContractions);
      await storeContractions(updatedContractions);
      setModalVisible(false);
      setCurrentContraction(null);
      checkContractionPattern(updatedContractions);
    }
  };

  // Armazena contrações no AsyncStorage
  const storeContractions = async (contractions) => {
    try {
      await AsyncStorage.setItem('@contractions', JSON.stringify(contractions));
    } catch (e) {
      console.error(e);
    }
  };

  // Excluir uma contração da lista
  const deleteContraction = async (index) => {
    const updatedContractions = contractions.filter((_, i) => i !== index);
    setContractions(updatedContractions);
    await storeContractions(updatedContractions);
  };

  // Modificada o estado do para msg de confirmação
  const confirmClearContractions = () => {
    setClearModalVisible(true);
  };

  // Um alert para confirma a exclusão de um unico elemento
  const confirmDeleteContraction = (index) => {
    Alert.alert(
      "Confirmar exclusão",
      "Você realmente deseja deletar esta contração?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancelado"),
          style: "cancel"
        },
        { 
          text: "Deletar", 
          onPress: () => deleteContraction(index),
          style: "destructive"
        }
      ],
      { cancelable: false }
    );
  };
  

  // Limpa todas as contrações do AsyncStorage
  const clearContractions = async () => {
    try {
      await AsyncStorage.removeItem('@contractions');
      setContractions([]);
      setClearModalVisible(false); // Fechar modal após a limpeza
    } catch (e) {
      console.error(e);
    }
  };

  // Verifica o padrão das contrações
  const checkContractionPattern = (contractions) => {
    if (contractions.length >= 3) {
      const lastThreeContractions = contractions.slice(-3);

      // Calcula intervalos entre as contrações
      const intervals = lastThreeContractions.map((contraction, index) => {
        if (index === 0) return 0;
        return (new Date(contraction.start) - new Date(lastThreeContractions[index - 1].start)) / 1000 / 60;
      }).slice(1);

      // Calcula a duração de cada contração
      const durations = lastThreeContractions.map(contraction => {
        return (new Date(contraction.end) - new Date(contraction.start)) / 1000 / 60;
      });

      // Verifica se os intervalos estão entre 4 e 10 minutos
      const areIntervalsRegular = intervals.every(interval => interval >= 4 && interval <= 10);

      // Verifica se a duração de cada contração está entre 30 e 90 segundos (0.5 e 1.5 minutos)
      const areDurationsRegular = durations.every(duration => duration >= 0.5 && duration <= 1.5);

      // Se ambos os padrões forem regulares, alertar o usuário
      if (areIntervalsRegular && areDurationsRegular) {
        Alert.alert('Atenção', 'Você pode estar em trabalho de parto real. Por favor, entre em contato com seu médico.');
      }
    }
  };

  // Calcula a duração média das contrações
  const calculateAverageDuration = () => {
    if (contractions.length === 0) return 0;
    const totalDuration = contractions.reduce((sum, contraction) => sum + contraction.duration, 0);
    return (totalDuration / contractions.length).toFixed(2);
  };

  // Calcula a frequência média entre as contrações
  const calculateAverageFrequency = () => {
    if (contractions.length < 2) return 0;
    const intervals = contractions.map((contraction, index) => {
      if (index === 0) return 0;
      return (new Date(contraction.start) - new Date(contractions[index - 1].start)) / 1000 / 60;
    }).slice(1);
    const totalFrequency = intervals.reduce((sum, interval) => sum + interval, 0);
    return (totalFrequency / intervals.length).toFixed(2);
  };

  return (
    <SafeAreaView style={styles.containerTela}>
      <Appbar.Header style={{ backgroundColor: '#d2ded0' }}>
        <Appbar.Action style={{paddingRight: 20}} icon="information" color="#1358e3" onPress={() => navigation.navigate('About')} />
        <Appbar.Action style={{paddingLeft: 20}}  icon="delete" color="#e31313" onPress={confirmClearContractions} />
      </Appbar.Header>
      <Modal
        animationType="slide"
        transparent={true}
        visible={clearModalVisible}
        onRequestClose={() => {
        setClearModalVisible(false);
        }}
>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Tem certeza que deseja limpar todo o Histórico?</Text>
      <View style={styles.modalButton}>
          <Button title="Confirmar" onPress={clearContractions} color="green"/>
        <View style={styles.modalButton} />
         <Button title="Cancelar" onPress={() => setClearModalVisible(false)} color="red" />
      </View>
        </View>
    </Modal>
          <Text style={styles.timer}>
        {isRunning ? `${Math.floor((new Date() - startTime) / 1000)} s` : '00:00:00'}
      </Text>
      <Text>Duração Média: {calculateAverageDuration()} segundos</Text>
      <Text style={{ paddingTop: 6 , paddingBottom: 4}}>Frequência Média: {calculateAverageFrequency()} minutos</Text>
      <FlatList 
        data={contractions}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onLongPress={() => confirmDeleteContraction(index)}>
            <View style={styles.itemFlatList}>
            <View style={styles.indexCircle}>
            <Text style={styles.indexText}>{index + 1}</Text>
          </View>
              <Text style={{paddingTop: 2}}>Duração: {item.duration} segundos</Text>
              <Text>Inicio: {new Date(item.start).toLocaleString()}</Text>
              <Text>{item.intensity || 'N/A'}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.roundButton, { backgroundColor: isRunning ? '#ff0000' : '#47b300' }]}
          onPress={startPauseTimer}
        >
          <Text style={styles.buttonText}>{isRunning ? 'Fim' : 'Início'}</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Selecione a Intensidade</Text>
          <View style={styles.modalButtonsVertical}>
            <TouchableOpacity style={[styles.modalButton, { backgroundColor: 'green' }]} onPress={() => saveContraction('Leve')}>
              <Text style={styles.modalButtonText}>Leve</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#cfc917' }]} onPress={() => saveContraction('Moderada')}>
              <Text style={styles.modalButtonText}>Moderada</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, { backgroundColor: 'red' }]} onPress={() => saveContraction('Intensa')}>
              <Text style={styles.modalButtonText}>Intensa</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );}
  

const styles = StyleSheet.create({
  containerTela: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#d2ded0'
  },
  itemFlatList: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
    backgroundColor: '#faf3ff',
    marginVertical: 2,
    lexDirection: 'row',
    width: '100%',
    borderRadius: 16,
  },
  indexCircle: {
    width: 30, 
    height: 30, 
    borderRadius: 15,
    backgroundColor: '#ff73a1',
    justifyContent: 'center',
    alignItems: 'center'
  },
  indexText: {
    color: 'white',
    fontWeight: 'bold',
  },
  timer: {
    paddingTop: 4,
    fontSize: 48,
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  roundButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    backgroundColor: '#ebecf0',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButtonsVertical: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  modalButton: {
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  modalButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

export default HomeScreen;
