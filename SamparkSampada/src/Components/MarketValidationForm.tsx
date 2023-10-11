import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';

const UserTypes = ['Retailer (Shopkeeper)', 'Customer'];

const MarketValidationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    occupation: '',
    location: '',
    type: '',
    retailerExperience: '',
    retailerGoods: '',
    retailerUsingTools: '',
    retailerInterested: '',
    retailerTechComfort: '',
    retailerFeatures: '',
    customerShopFrequency: '',
    customerShopOnlineFrequency: '',
    customerInterested: '',
    customerTechComfort: '',
    customerFeatures: '',
    additionalComments: '',
  });

  const [isTypeModalVisible, setTypeModalVisible] = useState(false);

  const onSubmit = () => {
    // Handle form submission here with formData
    console.log(formData);
  };

  const toggleTypeModal = () => {
    setTypeModalVisible(!isTypeModalVisible);
  };

  const handleTypeSelect = (item: string) => {
    setFormData({...formData, type: item});
    toggleTypeModal();
  };

  return (
    <View>
      <Text>Market Validation Form</Text>
      <View>
        <Text>Section 1: About You</Text>
        <TextInput
          placeholder="Name"
          value={formData.name}
          onChangeText={text => setFormData({...formData, name: text})}
        />
        <TextInput
          placeholder="Occupation"
          value={formData.occupation}
          onChangeText={text => setFormData({...formData, occupation: text})}
        />
        <TextInput
          placeholder="Location (City/Village)"
          value={formData.location}
          onChangeText={text => setFormData({...formData, location: text})}
        />
        <View>
          <Text>User Type:</Text>
          <TouchableOpacity onPress={toggleTypeModal}>
            <Text>{formData.type || 'Select a type'}</Text>
          </TouchableOpacity>
          <Modal
            visible={isTypeModalVisible}
            animationType="slide"
            transparent={true}>
            <View>
              <FlatList
                data={UserTypes}
                keyExtractor={item => item}
                renderItem={({item}) => (
                  <TouchableOpacity onPress={() => handleTypeSelect(item)}>
                    <Text>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </Modal>
        </View>
      </View>

      <View>
        <Text>Section 2: For Retailers</Text>
        <TextInput
          placeholder="How long have you been running your retail business?"
          value={formData.retailerExperience}
          onChangeText={text =>
            setFormData({...formData, retailerExperience: text})
          }
        />
        <TextInput
          placeholder="What types of goods do you sell?"
          value={formData.retailerGoods}
          onChangeText={text => setFormData({...formData, retailerGoods: text})}
        />
        <TextInput
          placeholder="Do you currently use any digital tools or software to manage your business?"
          value={formData.retailerUsingTools}
          onChangeText={text =>
            setFormData({...formData, retailerUsingTools: text})
          }
        />
        <Text>
          Would you be interested in a platform that allows you to list your
          products online, manage inventory, offer digital payments, and deliver
          to customers?
        </Text>
        <TextInput
          placeholder="How comfortable are you with using technology in your business?"
          value={formData.retailerTechComfort}
          onChangeText={text =>
            setFormData({...formData, retailerTechComfort: text})
          }
        />
        <TextInput
          placeholder="What features would you find most useful in a retail management app?"
          value={formData.retailerFeatures}
          onChangeText={text =>
            setFormData({...formData, retailerFeatures: text})
          }
        />
      </View>

      <View>
        <Text>Section 3: For Customers</Text>
        <TextInput
          placeholder="How often do you shop at local stores?"
          value={formData.customerShopFrequency}
          onChangeText={text =>
            setFormData({...formData, customerShopFrequency: text})
          }
        />
        <TextInput
          placeholder="How often do you shop online?"
          value={formData.customerShopOnlineFrequency}
          onChangeText={text =>
            setFormData({...formData, customerShopOnlineFrequency: text})
          }
        />
        <Text>
          Would you be interested in an app that allows you to browse and
          purchase items from your local stores?
        </Text>
        <TextInput
          placeholder="What features would you find most useful in a local shopping app?"
          value={formData.customerFeatures}
          onChangeText={text =>
            setFormData({...formData, customerFeatures: text})
          }
        />
        <TextInput
          placeholder="How comfortable are you with using technology for shopping?"
          value={formData.customerTechComfort}
          onChangeText={text =>
            setFormData({...formData, customerTechComfort: text})
          }
        />
      </View>

      <View>
        <Text>Section 4: General</Text>
        <TextInput
          placeholder="Any additional comments or suggestions for HOPP?"
          value={formData.additionalComments}
          onChangeText={text =>
            setFormData({...formData, additionalComments: text})
          }
        />
      </View>

      <TouchableOpacity onPress={onSubmit}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MarketValidationForm;
