const ChatStyles = {
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#f4f4f9',
  },
  header: {
    padding: '20px',
    backgroundColor: '#3f51b5',
    color: '#fff',
    textAlign: 'center',
  },
  chatHistory: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
  },
  textArea: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    borderTop: '1px solid #ccc',
    backgroundColor: '#fff',
  },
  inputText: {
    flex: 1,
    padding: '10px',
    borderRadius: '20px',
    border: '1px solid #ccc',
    marginRight: '10px',
  },
  sendButton: {
    backgroundColor: '#3f51b5',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  message: {
    display: 'flex',
    margin: '10px 0',
  },
  messageBubble: {
    maxWidth: '60%',
    padding: '10px',
    borderRadius: '20px',
  },
  rexBubble: {
    backgroundColor: '#3f51b5',
    color: '#fff',
    alignSelf: 'flex-start',
  },
  userBubble: {
    backgroundColor: '#e0e0e0',
    color: '#000',
    alignSelf: 'flex-end',
  },
  rexMessageContainer: {
    display: 'flex',
    marginBottom: '10px',
  },
  rexMessageAvatarContainer: {
    marginRight: '10px',
  },
  rexMessageAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
  },
  rexMessageTextContainer: {
    backgroundColor: '#3f51b5',
    borderRadius: '10px',
    padding: '10px',
    color: '#fff',
  },
  rexMessageText: {
    color: '#fff',
  },
  userMessageContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '10px',
  },
  userMessageTextContainer: {
    backgroundColor: '#e0e0e0',
    borderRadius: '10px',
    padding: '10px',
    color: '#000',
  },
  userMessageText: {
    color: '#000',
  },
};

export default ChatStyles;
