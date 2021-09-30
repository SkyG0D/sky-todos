import React from 'react';
import { RootSiblingParent } from 'react-native-root-siblings'

import { Todo } from './screens/Todo';

export default function App() {
  return (
    <RootSiblingParent>
      <Todo />
    </RootSiblingParent>
  );
}

// TODO: Fechar modal ao clicar em voltar no celular.
// TODO: Fechar modal ao clicar fora do modal.
// TODO: Adicionar header.
// TODO: Adicionar temas.
// TODO: Arrumar mensagens.
// TODO: Separar em sub componentes os componente de TODO.
// TODO: Filtro de fazeres.
