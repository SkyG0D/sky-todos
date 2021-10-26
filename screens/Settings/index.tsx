import React, { FC, useContext, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";

import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Share,
  Alert,
} from "react-native";

import { TOAST_VISIBILITY_TIME } from "../../globals";

import { SettingsContext, ThemesEnum } from "../../context/SettingsContext";
import { TodoContext } from "../../context/TodoContext";
import { ThemeSelect } from "./components/ThemeSelect";
import { ExportSelect } from "./components/ExportSelect";

import { getMessageTodoByFormat } from "../../utils/getMessageTodoByFormat";

import { getStyles } from "./styles";
import { colorThemes } from "../../colorTheme";
import { ImportTodos } from "./components/ImportTodos";

export const Settings: FC = () => {
  const { settings, setSettings } = useContext(SettingsContext);
  const { todos, setTodos } = useContext(TodoContext);

  const [showFAQ, setShowFAQ] = useState<boolean>(false);
  const [exportFormat, setExportFormat] = useState<"plain" | "json">("plain");

  const styles = getStyles(settings.theme);
  const colorTheme = colorThemes[settings.theme];

  function resetTodos() {
    function deleteTodos() {
      setTodos([]);
    }

    Alert.alert(
      "Remover TODOs",
      "Deseja remover os TODOs por completo? \n\nAntes de remover os TODOs, é aconselhado fazer um backup.",
      [{ text: "Cancelar" }, { text: "Remover TODOs", onPress: deleteTodos }]
    );
  }

  function toggleShowFAQ() {
    setShowFAQ(!showFAQ);
  }

  function switchTheme(value: ThemesEnum) {
    setSettings({ ...settings, theme: value });
  }

  async function shareExportType() {
    if (todos.length > 0) {
      const message = getMessageTodoByFormat(todos, exportFormat);

      await Share.share({
        message,
      });
    } else {
      Toast.show({
        type: "info",
        text1: "Não existem TODOs para compartilhar.",
        visibilityTime: TOAST_VISIBILITY_TIME.short,
        position: "bottom",
      });
    }
  }

  return (
    <View>
      <ScrollView style={styles.container}>
        <View style={styles.settings__switches}>
          <View style={styles.settings__switch__wrapper}>
            <ThemeSelect
              theme={settings.theme}
              handleChangeValue={switchTheme}
            />
          </View>

          <ImportTodos theme={settings.theme} />

          <ExportSelect
            theme={settings.theme}
            selectedFormat={exportFormat}
            handleChangeValue={setExportFormat}
          />

          <View style={styles.settings__actionsContainer}>
            <TouchableOpacity
              onPress={shareExportType}
              style={styles.settings__shareBtn}
            >
              <Icon
                name="share"
                size={20}
                color={colorTheme.configurations.shareBtnColor}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={resetTodos}
              style={styles.settings__resetBtn}
            >
              <Icon
                name="remove"
                size={20}
                color={colorTheme.configurations.resetTodosColor}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.settings__center}>
          <TouchableOpacity
            onPress={toggleShowFAQ}
            style={styles.settings__showFAQ}
          >
            <Text style={styles.settings__showFAQ__text}>
              {showFAQ ? "Esconder" : "Mostrar"} FAQ
            </Text>
          </TouchableOpacity>
        </View>

        {showFAQ && (
          <View style={styles.settings__faq}>
            <Text style={styles.settings__faq__title}>
              Perguntas Frequentes
            </Text>

            <View style={styles.settings__question}>
              <Text style={styles.settings__question__text}>
                O que é um TODO?
              </Text>
              <Text style={styles.settings__question__text}>
                Um TODO é uma tarefa, que você deve realizar, um "a fazer".
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
