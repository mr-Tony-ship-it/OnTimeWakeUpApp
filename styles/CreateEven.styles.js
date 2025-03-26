// CreateEvent.styles.js
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#f5f5f5',
  },
  container: {
    width: width * 0.9,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    boxShadow: '0 2px 2px rgba(0, 0, 0, 0.8)',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#e0e0e0',
    color: '#333333',
    padding: 12,
    borderRadius: 5,
    marginBottom: 16,
  },
  textInput: {
    backgroundColor: '#e0e0e0',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    color: '#333333',
    padding: 12,
    marginBottom: 16,
  },
  dateOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  dateOption: {
    flex: 1,
    padding: 12,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  dateOptionSelected: {
    backgroundColor: '#ff6347',  // Coral color
  },
  dateOptionUnselected: {
    backgroundColor: '#b0b0b0',
  },
  dateOptionTextSelected: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dateOptionTextUnselected: {
    color: '#333333',
    textAlign: 'center',
  },
  selectedDate: {
    backgroundColor: '#e0e0e0',
    color: '#333333',
    padding: 12,
    borderRadius: 5,
    textAlign: 'center',
    marginTop: 8,
  },
  datePicker: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  submitButton: {
    backgroundColor: '#4CAF50',  // Green color
    padding: 14,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 10,
  },
  loadingIndicator: {
    marginTop: 16,
  },
});
