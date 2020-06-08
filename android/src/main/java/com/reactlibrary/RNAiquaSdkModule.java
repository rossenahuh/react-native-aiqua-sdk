
package com.reactlibrary;

import android.app.Activity;
import android.content.Context;
import android.content.pm.PackageManager;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableNativeArray;
import com.quantumgraph.sdk.Completion;
import com.quantumgraph.sdk.AIQP;
import com.quantumgraph.sdk.QG;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;
import java.util.Iterator;

import static java.lang.Thread.sleep;

public class RNAiquaSdkModule extends ReactContextBaseJavaModule {

  public RNAiquaSdkModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "RNAiquaSdk";
  }

  @ReactMethod
  public void onStartWithSenderId(String appId, String senderId) {
    if (senderId != null) {
      QG.initializeSdkForRN(getReactApplicationContext(), appId, senderId);
    } else {
      QG.initializeSdkForRN(getReactApplicationContext(), appId);
    }
    initInApp(appId, senderId, 0);
  }

  void initInApp(String appId, String senderId, int count) {
    try {
      Activity currActivity = getCurrentActivity();
      if (currActivity != null) {
        QG.initializeInApp(currActivity.getApplication());
        QG.setInAppCurrActivity(currActivity);
      } else {
          if (count < 5) {
            sleep(100);
            initInApp(appId, senderId, ++count);
          } else {
            QG.getInstance(getReactApplicationContext()).logEvent("RNAiqua_cant_get_activity");
            Log.e("RNAiquaSdkModule", "getCurrentActivity() == null");
          }
        }
    } catch (Exception e) {
      e.printStackTrace();
      Log.e("RNAiquaSdkModule", e.getMessage());
    }
  }

  @ReactMethod
  public void logEvent(String eventName) {
    QG.getInstance(getReactApplicationContext()).logEvent(eventName);
  }

  @ReactMethod
  public void logEventWithParameters(String eventName, ReadableMap parameters) {
    try {
      JSONObject jsonObject = reactToJSON(parameters);
      QG.getInstance(getReactApplicationContext()).logEvent(eventName, jsonObject);
    } catch (JSONException e) {
      e.printStackTrace();
    }
  }

  @ReactMethod
  public void logEventWithValueToSum(String eventName, Double valueToSum) {
    QG.getInstance(getReactApplicationContext()).logEvent(eventName, valueToSum);
  }

  @ReactMethod
  public void logEventWithValueToSumAndCurrency(String eventName, double valueToSum, String valueToSumCurrency) {
    QG.getInstance(getReactApplicationContext()).logEvent(eventName, valueToSum, valueToSumCurrency);
  }

  @ReactMethod
  public void logEventWithParametersAndValueToSum(String eventName, ReadableMap parameters, double valueToSum) {
    try {
      JSONObject jsonObject = reactToJSON(parameters);
      QG.getInstance(getReactApplicationContext()).logEvent(eventName, jsonObject, valueToSum);
    } catch (JSONException e) {
      e.printStackTrace();
    }
  }

  @ReactMethod
  public void logEventWithParametersAndValueToSumAndCurrency(String eventName, ReadableMap parameters, double valueToSum, String valueToSumCurrency) {
    try {
      JSONObject jsonObject = reactToJSON(parameters);
      QG.getInstance(getReactApplicationContext()).logEvent(eventName, jsonObject, valueToSum, valueToSumCurrency);
    } catch (JSONException e) {
      e.printStackTrace();
    }
  }

  @ReactMethod
  public void setClickAttributionWindow(int seconds) {
    QG.getInstance(getReactApplicationContext()).setClickAttributionWindow(seconds);
  }

  @ReactMethod
  public void setAttributionWindow(int seconds) {
    QG.getInstance(getReactApplicationContext()).setAttributionWindow(seconds);
  }

  @ReactMethod
  public void disableInAppCampaigns(boolean disabled) throws Exception {
    if (disabled) {
      try {
        QG.getInstance(getReactApplicationContext()).hideInApp(getCurrentActivity());
      } catch (Exception e) {
        e.printStackTrace();
      }
    } else {
      new Exception("Cannot call disableInAppCampaigns(true) in Android").printStackTrace();
    }
  }

  @ReactMethod
  public void flush() {
    QG.getInstance(getReactApplicationContext()).flush();
  }

  @ReactMethod
  public void setUserId(String userId) {
    QG.getInstance(getReactApplicationContext()).setUserId(userId);
  }

  @ReactMethod
  public void setName(String name) {
    QG.getInstance(getReactApplicationContext()).setName(name);
  }

  @ReactMethod
  public void setFirstName(String firstName) {
    QG.getInstance(getReactApplicationContext()).setFirstName(firstName);
  }

  @ReactMethod
  public void setLastName(String lastName) {
    QG.getInstance(getReactApplicationContext()).setLastName(lastName);
  }

  @ReactMethod
  public void setCity(String city) {
    QG.getInstance(getReactApplicationContext()).setCity(city);
  }

  @ReactMethod
  public void setEmail(String email) {
    QG.getInstance(getReactApplicationContext()).setEmail(email);
  }

  @ReactMethod
  public void setDayOfBirth(int day) {
    QG.getInstance(getReactApplicationContext()).setDayOfBirth(day);
  }

  @ReactMethod
  public void setMonthOfBirth(int month) {
    QG.getInstance(getReactApplicationContext()).setMonthOfBirth(month);
  }

  @ReactMethod
  public void setYearOfBirth(int year) {
    QG.getInstance(getReactApplicationContext()).setYearOfBirth(year);
  }

  // The followings are for Android Only
  @ReactMethod
  public void setCustomKeyInt(String key, int intVal) {
      QG.getInstance(getReactApplicationContext()).setCustomUserParameter(key, intVal);
  }

  @ReactMethod
  public void setCustomKeyFloat(String key, float floatVal) {
      QG.getInstance(getReactApplicationContext()).setCustomUserParameter(key, floatVal);
  }

  @ReactMethod
  public void setCustomKeyString(String key, String stringVal) {
      QG.getInstance(getReactApplicationContext()).setCustomUserParameter(key, stringVal);
  }

  @ReactMethod
  public void setCustomKeyBool(String key, Boolean boolVal) {
      QG.getInstance(getReactApplicationContext()).setCustomUserParameter(key, boolVal);
  }


  @ReactMethod
  public void enableGATrackingWithGAID(String gaID) {
    QG.getInstance(getReactApplicationContext()).enableGATrackingWithGAID(gaID);
  }

  @ReactMethod
  public void enablePushBooster() {
    QG.getInstance(getReactApplicationContext()).enablePushBooster();
  }

  @ReactMethod
  public void disableGATracking() {
    QG.getInstance(getReactApplicationContext()).disableGATracking();
  }

  @ReactMethod
  public void getTrackerId(Callback callback) {
    String trackerId = QG.getInstance(getReactApplicationContext()).getTrackerId();
    callback.invoke(trackerId);
  }

  @ReactMethod
  public void isQGMessage(String message, Callback callback) {
    boolean isQGMessage = QG.isQGMessage(message);
    callback.invoke(isQGMessage);
  }

  /**
   * event app_launch and FCM ID logging are already triggered in Service,
   * do we still need this function in React?
   */
//    @ReactMethod
//    public void onStart(boolean isFirstAppLaunch, boolean isFcmTokenLogged) {
//        qg.onStart(isFirstAppLaunch, isFcmTokenLogged);
//    }

  @ReactMethod
  public void setMaxNumStoredNotifications(int maxNumStoredNotifications) {
    QG.getInstance(getReactApplicationContext()).setMaxNumStoredNotifications(maxNumStoredNotifications);
  }

  @ReactMethod
  public void getStoredNotifications(Callback callback) {
    String storedNotifications = QG.getInstance(getReactApplicationContext()).getStoredNotificationString();
    callback.invoke(storedNotifications);
  }

  @ReactMethod
  public void deleteStoredNotifications() {
    QG.getInstance(getReactApplicationContext()).deleteStoredNotifications();
  }

  @ReactMethod
  public void onStop() {
    QG.getInstance(getReactApplicationContext()).onStop();
  }

  @ReactMethod
  public void setPhoneNumber(String phoneNo) {
    QG.getInstance(getReactApplicationContext()).setPhoneNumber(phoneNo);
  }

  @ReactMethod
  public void setUtmSource(String utmSource) {
    QG.getInstance(getReactApplicationContext()).setUtmSource(utmSource);
  }

  @ReactMethod
  public void setUtmMedium(String utmMedium) {
    QG.getInstance(getReactApplicationContext()).setUtmMedium(utmMedium);
  }

  @ReactMethod
  public void setUtmTerm(String utmTerm) {
    QG.getInstance(getReactApplicationContext()).setUtmTerm(utmTerm);
  }

  @ReactMethod
  public void setUtmContent(String utmContent) {
    QG.getInstance(getReactApplicationContext()).setUtmContent(utmContent);
  }

  @ReactMethod
  public void setUtmCampaign(String utmCampaign) {
    QG.getInstance(getReactApplicationContext()).setUtmCampaign(utmCampaign);
  }

  @ReactMethod
  public void disableLocationTracking() {
    QG.getInstance(getReactApplicationContext()).disableLocationTracking();
  }

  @ReactMethod
  public void getRecommendationForModelUserToProduct(
          final Callback errorCallback,
          final Callback successCallback
  ) {
    QG.getInstance(
      getReactApplicationContext()
    ).getRecommendationForModelUserToProduct(new Completion() {
        @Override
        public void onComplete(JSONArray response) {
            try {
              WritableArray result = convertJsonToArray(response);
              successCallback.invoke(result);
            } catch (Exception e) {
              e.printStackTrace();
              errorCallback.invoke("Error fetching data!");
            }
        }
    });
  }

  @ReactMethod
  public void setPersonalizationDisabledStatus(boolean disabled) {
    AIQP.setPersonalizationDisabledStatus(disabled, getReactApplicationContext());
  }

  @ReactMethod
  public void getPersonalizedConfig(String key, String type, String component, String defaultValue, Callback callback) {
    String verName = getVerName();
    String context = verName + "``|``" + component;
    String value = AIQP.getValue(context, key, type, defaultValue);
    callback.invoke(value);
  }

  @ReactMethod
  public void getAllPersonalizedConfigs(Callback callback) {
    HashMap<String, String> hashMap = AIQP.getAllPersonalizedConfigs();
    WritableMap writableMap = new WritableNativeMap();
    for (Map.Entry<String, String> entry : hashMap.entrySet()) {
      writableMap.putString(entry.getKey(), entry.getValue());
    }
    callback.invoke(writableMap, getVerName());
  }

  // only to send the config and not return
  @ReactMethod
  public void setAIQPConfigForKey(String key, String type, String context, String defaultValue) {
    String value = AIQP.getValue(context, key, type, defaultValue);
  }

  private String getVerName() {
    String verName = "";
    Context appContext = getReactApplicationContext();
    try {
      verName = appContext.getPackageManager().getPackageInfo(appContext.getPackageName(), 0).versionName;
    } catch (PackageManager.NameNotFoundException e) {
      e.printStackTrace();
    }
    return verName;
  }

  // native to react native
  private static WritableMap convertJsonToMap(JSONObject jsonObject) throws JSONException {
    WritableMap map = new WritableNativeMap();

    Iterator<String> iterator = jsonObject.keys();
    while (iterator.hasNext()) {
        String key = iterator.next();
        Object value = jsonObject.get(key);
        if (value instanceof JSONObject) {
            map.putMap(key, convertJsonToMap((JSONObject) value));
        } else if (value instanceof  JSONArray) {
            map.putArray(key, convertJsonToArray((JSONArray) value));
        } else if (value instanceof  Boolean) {
            map.putBoolean(key, (Boolean) value);
        } else if (value instanceof  Integer) {
            map.putInt(key, (Integer) value);
        } else if (value instanceof  Double) {
            map.putDouble(key, (Double) value);
        } else if (value instanceof String)  {
            map.putString(key, (String) value);
        } else {
            map.putString(key, value.toString());
        }
    }
    return map;
  }

  private static WritableArray convertJsonToArray(JSONArray jsonArray) throws JSONException {
    WritableArray array = new WritableNativeArray();

    for (int i = 0; i < jsonArray.length(); i++) {
        Object value = jsonArray.get(i);
        if (value instanceof JSONObject) {
            array.pushMap(convertJsonToMap((JSONObject) value));
        } else if (value instanceof  JSONArray) {
            array.pushArray(convertJsonToArray((JSONArray) value));
        } else if (value instanceof  Boolean) {
            array.pushBoolean((Boolean) value);
        } else if (value instanceof  Integer) {
            array.pushInt((Integer) value);
        } else if (value instanceof  Double) {
            array.pushDouble((Double) value);
        } else if (value instanceof String)  {
            array.pushString((String) value);
        } else {
            array.pushString(value.toString());
        }
    }
    return array;
  }

  // react native to native

  private static JSONObject reactToJSON(ReadableMap readableMap) throws JSONException {
    JSONObject jsonObject = new JSONObject();
    ReadableMapKeySetIterator iterator = readableMap.keySetIterator();
    while(iterator.hasNextKey()){
      String key = iterator.nextKey();
      ReadableType valueType = readableMap.getType(key);
      switch (valueType){
        case Null:
          jsonObject.put(key,JSONObject.NULL);
          break;
        case Boolean:
          jsonObject.put(key, readableMap.getBoolean(key));
          break;
        case Number:
          try {
            jsonObject.put(key, readableMap.getInt(key));
          } catch(Exception e) {
            jsonObject.put(key, readableMap.getDouble(key));
          }
          break;
        case String:
          jsonObject.put(key, readableMap.getString(key));
          break;
        case Map:
          jsonObject.put(key, reactToJSON(readableMap.getMap(key)));
          break;
        case Array:
          jsonObject.put(key, reactToJSON(readableMap.getArray(key)));
          break;
      }
    }
    return jsonObject;
  }

  private static JSONArray reactToJSON(ReadableArray readableArray) throws JSONException {
    JSONArray jsonArray = new JSONArray();
    for(int i=0; i < readableArray.size(); i++) {
      ReadableType valueType = readableArray.getType(i);
      switch (valueType){
        case Null:
          jsonArray.put(JSONObject.NULL);
          break;
        case Boolean:
          jsonArray.put(readableArray.getBoolean(i));
          break;
        case Number:
          try {
            jsonArray.put(readableArray.getInt(i));
          } catch(Exception e) {
            jsonArray.put(readableArray.getDouble(i));
          }
          break;
        case String:
          jsonArray.put(readableArray.getString(i));
          break;
        case Map:
          jsonArray.put(reactToJSON(readableArray.getMap(i)));
          break;
        case Array:
          jsonArray.put(reactToJSON(readableArray.getArray(i)));
          break;
      }
    }
    return jsonArray;
  }
}