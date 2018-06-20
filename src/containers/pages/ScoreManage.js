import React from 'react';

class ScoreManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: props.questions,
            expectedScore: props.expectedScore || [3, 3, 3, 3, 3, 3, 3],
            score: props.score || [3, 3, 3, 3, 3, 3, 3],
            numOfQuestion: props.numOfQuestion || 7
        }
        console.log(props);

        this.CreateTable.bind(this);
    }

    CreateTable() {
        let table = [];
        for (let i = 0; i < this.state.numOfQuestion; i++) {
            table.push(<tr>
                <td>{i + 1}</td>
                <td>{this.state.questions[i]}</td>
                <td>{this.state.expectedScore[i]}</td>
                <td>{this.state.score[i]}</td>
                <td>15%</td>
                <td>9%</td>
            </tr>);
        }
        return (
            <div>
                <table>
                    <tr>
                        <th>No.</th>
                        <th>Appraisal Criteria</th>
                        <th>Score</th>
                        <th>Total Average</th>
                        <th>Weight</th>
                        <th>Total Point</th>
                    </tr>
                    {table}
                </table>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.CreateTable()}
            </div>
        );
    }
}

export default ScoreManager;