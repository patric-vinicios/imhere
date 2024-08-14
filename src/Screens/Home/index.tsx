import React, { useState } from 'react'
import {Text, TextInput, View, TouchableOpacity, FlatList, Alert} from 'react-native'

import {Participant} from '../../components/Participant'

import {styles} from './styles'

export function Home() {

  const [participants, setParticipants] = useState<string[]>([])
  const [participantName, setParticipantName] = useState("")

    function handleParticipantAdd() {
      if (participants.includes(participantName)) {
        return Alert.alert("Participante existente", "Participante já adicionado")
      }
      setParticipants(prevState => [...prevState, participantName])
      setParticipantName("")
    }

    function handleParticipantRemove(name: string) {
      Alert.alert("Remover", `Deseja remover ${name}?`, [
        {
          text: 'Sim',
          onPress: () => setParticipants(prevState => participants.filter(participant => participant !== name))
        },
        {
          text: 'Não',
          style: 'cancel'
        }
      ])
      console.log(`${name} removed`)
    }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Nome do Evento
      </Text>
      <Text style={styles.eventDate}>
        Sexta, 4 de Novembro de 2022
      </Text>


    <View style={styles.form}>
         <TextInput 
        style={styles.input}
        placeholder="Nome do participante"
        placeholderTextColor="#6B6B6B"
        onChangeText={setParticipantName}
        value={participantName}
    />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
            <Text style={styles.buttonText}>
                +
            </Text>
        </TouchableOpacity>
    </View>

    <FlatList
      data={participants}
      keyExtractor={item => item}
      renderItem={({item}) => (
        <Participant name={item} onRemove={() => handleParticipantRemove(`${item}`)} key={item} />
      )}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => (
        <Text style={styles.listEmptyText}>
          Ninguém chegou no evento ainda? Adicione participantes manualmente.
        </Text>
      )}
    />
    </View>
  )
}