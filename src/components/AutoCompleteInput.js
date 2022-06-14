import React, { useState } from 'react';
import Spinner from '@atlaskit/spinner';
import Tooltip from '@atlaskit/tooltip';
import { useSelector } from 'react-redux';
import AsyncSelect from 'react-select/async';
import { getAutoCompleteAddressAPI, searchAutoCompleteAddressAPI } from '../api/authApi';

const LoadingIndicator = (props) => {
  return (
    <Tooltip content={'Custom Loader'}>
      <Spinner {...props} delay={0} />
    </Tooltip>
  );
};

const AutoCompleteInput = (props) => {
  
  const selector = useSelector(state=>(state.auth.quoteDetail)) 

  const [addressList, setAddressList] = useState([])
  const [state, setState] = useState(props.defaultValue);


  const handleSelect = (value) => {
    props.setAutoComplete(false)
    if(props.type==="from"){
      props.setAutoComplete1(false)
    }
    if(props.type==="to"){
      props.setAutoComplete2(false)
    }
    
    const selectedItem =value;
    const stateField = {
      value: value.value,
      label: value.label
    }
    setState(stateField)
    if (selectedItem) {
      // extra comment line 42 after approval of api
      props.handleSelect({...stateField })
      // getAutoCompleteAddressAPI(selectedItem.Id).then(function (response) {
      //   const selectedAddress = JSON.stringify(response.data.Items);
      //   if (selectedAddress) {
      //     let optionList = JSON.parse(selectedAddress)
      //     props.handleSelect({ ...optionList[0], ...stateField })
      //   }
      // }).catch(function (error) {
      //   console.log(error);
      // });
    }
  }

  const promiseOptions = (inputValue, callback) => {
    if (!inputValue) {
      setState(props.value)
      
      return callback(props.value);
    }
    return (
      new Promise((resolve) => {
        setTimeout(() => {
          searchAutoCompleteAddressAPI(inputValue).then(function (response) {
            const addressData = JSON.stringify(response.data.Items);
            if (addressData) {
              let optionList = JSON.parse(addressData).map(item => ({ ...item, label: item.Text, value: item.Text }))
              setAddressList(optionList);
              resolve(optionList)
            }
          }).catch(function (error) {
          });
        }, 1000);
      })
    )
  }

  return (
    <>
    <AsyncSelect
      cacheOptions
      defaultOptions
      loadOptions={promiseOptions}
      value={(state?state:props.val)}
      components={{ LoadingIndicator }}
      placeholder="Select Address"
      onChange={(e) => handleSelect(e)}

    />
    
    </>
  );
};

export default AutoCompleteInput;
