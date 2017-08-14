import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { changeArr, changeBaz, changeFoo, changeBar, changeMany } from './state/actions';

/**
 * Standard react-redux mapStateToProps -- maps state from the Redux store to
 * the `baz` prop in MainPage. Used via the higher-order component `connect`.
 */
function mapStateToProps(state) {
  return {
    baz: state.baz,
    arr: state.arr,
    bar: state.bar,
    foo: state.foo,
  };
}

/**
 * Standard react-redux mapDispatchToProps
 */
function mapDispatchToProps(dispatch) {
  return {
    onChangeArr: arr => dispatch(changeArr(arr)),
    onChangeFoo: foo => dispatch(changeFoo(foo)),
    onChangeBar: bar => dispatch(changeBar(bar)),
    onChangeBaz: baz => dispatch(changeBaz(baz)),
    onChangeMany: foo => dispatch(changeMany({ foo })),
  };
}

/**
 * The MainPage container. Note that none of the code within this component
 * indicates which values are stored in the URL and which are stored in the Redux
 * store.
 */
class MainPage extends PureComponent {
  render() {
    const { arr, foo, bar, baz, onChangeArr, onChangeBar, onChangeBaz,
      onChangeFoo, onChangeMany } = this.props;

    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>arr</td>
              <td>{JSON.stringify(arr)}</td>
              <td>(url query param)</td>
              <td>
                <button
                  onClick={() => onChangeArr(
                    [Math.round(Math.random() * 9), Math.round(Math.random() * 9)])}
                >
                  Change arr
                </button>
              </td>
            </tr>
            <tr>
              <td>foo</td>
              <td>{JSON.stringify(foo)}</td>
              <td>(url query param)</td>
              <td>
                <button onClick={() => onChangeFoo({ foo: Math.round(Math.random() * 1000) })}>
                  Change foo
                </button>
              </td>
            </tr>
            <tr>
              <td>bar</td>
              <td>{bar}</td>
              <td>(url query param)</td>
              <td>
                <button onClick={() => onChangeBar(Math.random().toString(32).substring(8))}>
                  Change bar
                </button>
              </td>
            </tr>
            <tr>
              <td>baz</td>
              <td>{baz}</td>
              <td>(redux state)</td>
              <td>
                <button onClick={() => onChangeBaz(Math.random().toString(32).substring(10))}>
                  Change baz
                </button>
              </td>
            </tr>
            <tr>
              <td />
              <td />
              <td />
              <td>
                <button onClick={() => onChangeMany(Math.round(Math.random() * 2000))}>
                  Change many
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

MainPage.propTypes = {
  arr: PropTypes.array,
  bar: PropTypes.string,
  baz: PropTypes.string,
  foo: PropTypes.object,
  onChangeArr: PropTypes.func,
  onChangeBar: PropTypes.func,
  onChangeBaz: PropTypes.func,
  onChangeFoo: PropTypes.func,
  onChangeMany: PropTypes.func,
};


export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
