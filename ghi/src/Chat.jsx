import React from 'react'
import Filter from 'bad-words'
function MessageRow(props) {
    const when = new Date(props.message.timestamp)
    return (
        <tr className="flex-row py-6 px-3 justify-center items-center">
            <td className="text-lg">Radio Check:</td>
            <td className="flex flex-row py-6 px-7 mb-7 mr-7 ml-7 justify-center items-center bg-gray-950 rounded-r-lg rounded-t-lg border-b-2 border-gray-800">
                {props.message.content}
            </td>
            <td className="pl-7 text-xs font-medium">
                {when.toLocaleString()}
            </td>
        </tr>
    )
}

class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: [],
            clientId: Number.parseInt(Math.random() * 10000000),
            connected: false,
            message: '',
        }
        this.sendMessage = this.sendMessage.bind(this)
        this.updateMessage = this.updateMessage.bind(this)
    }

  connect() {
    if (this.loading && !this.state.connected) {
      return;
    }
    this.loading = true;
    const chatUrl = import.meta.env.VITE_API_WS;
    const url = `${chatUrl}/chat/${this.state.clientId}`;
    this.socket = new WebSocket(url);
    this.socket.addEventListener('open', () => {
      this.setState({ connected: true });
      this.loading = false;
    });
    this.socket.addEventListener('close', () => {
      this.setState({ connected: false });
      this.loading = false;
      setTimeout(() => {
        this.connect();
      }, 1000);
    });
    this.socket.addEventListener('error', () => {
      this.setState({ connected: false });
      this.loading = false;
      setTimeout(() => {
        this.connect();
      }, 1000);
    });
    this.socket.addEventListener('message', (message) => {
      const filteredMessage = this.filterMessage(JSON.parse(message.data));
      this.setState({
        messages: [filteredMessage, ...this.state.messages],
      });
    });
  }

    componentDidMount() {
        this.connect()
    }

    filterMessage(message) {
        const filter = new Filter()
        const filteredContent = filter.clean(message.content)
        return { ...message, content: filteredContent }
    }

    sendMessage(e) {
        e.preventDefault()
        this.socket.send(this.state.message)
        this.setState({ message: '' })
    }

    updateMessage(e) {
        this.setState({ message: e.target.value })
    }

    render() {
        return (
            <>
                <div className="Chat-text w-screen bg-gradient-to-r from-[#282c34] via-[#50555c] to-[#a4a9af]">
                    <div className="bg-gray-900 text-green-600 pl-5">
                        <h1 className="Chat-text text-5xl pt-5 pl-5 mb-5 underline font-virgil">
                            NLB Radio
                        </h1>
                        <h2 className="text-xl">
                            Your ID: {this.state.clientId}
                        </h2>
                        <table className="container table-auto flex-1 px-7 py-6 bg-black">
                            <thead>
                                <tr>
                                    <th className="text-xl underline">
                                        Radio Traffic
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="overflow-y-scroll w-full text-lg flex flex-col-reverse h-screen">
                                {this.state.messages.map((message) => (
                                    <MessageRow
                                        key={
                                            message.clientId + message.timestamp
                                        }
                                        message={message}
                                    />
                                ))}
                            </tbody>
                        </table>
                        <form onSubmit={this.sendMessage}>
                            <p className="text-xl pl-5 pt-5">
                                Outgoing Transmission:
                            </p>
                            <input
                                value={this.state.message}
                                className="form-control text-black w-1/2 px-3 py-3 text-lg message-input"
                                type="text"
                                id="messageText"
                                autoComplete="off"
                                spellCheck="True"
                                onChange={this.updateMessage}
                            />
                            <button
                                type="submit"
                                className="mt-7 ml-7 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-lg px-7 py-3 mb-3 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                            >
                                Send It!
                            </button>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}

export default Chat
