<template>
  <div class="container">
    <form @submit.prevent="encrypt" @keydown="form.errors.clear($event.target.name)">
      <div class="field is-grouped">
        <div class="control is-expanded">
          <label class="label" for="text">Text</label>
          <input
            v-model="form.text"
            id="text"
            name="text"
            type="text"
            class="input"
            placeholder="Some sentence."
          />
          <p
            class="help"
          >Value of this input will be converted to uppercase and any spaces will be replaced with underscore.</p>
          <p v-show="form.errors.has('text')" class="help is-danger">{{ form.errors.get('text') }}</p>
        </div>
        <div class="control padded">
          <div class="file">
            <label class="file-label">
              <input class="file-input" type="file" name="resume" @change="upload" ref="file" />
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">Choose a file…</span>
              </span>
            </label>
          </div>
        </div>
      </div>
      <div class="field">
        <label class="label" for="secret">Secret</label>
        <div class="control">
          <input
            v-model="form.secret"
            id="secret"
            name="secret"
            class="input"
            :class="{'is-danger': form.errors.has('secret')}"
            type="text"
            placeholder="ex. EAGLE"
          />
        </div>
        <p v-show="form.errors.has('secret')" class="help is-danger">{{ form.errors.get('secret') }}</p>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button type="submit" class="button" :disabled="form.errors.any()">Encrypt</button>
        </div>
        <div class="control">
          <button
            type="button"
            class="button"
            :disabled="form.errors.any()"
            @click="decrypt"
          >Decrypt</button>
        </div>
      </div>
      <div class="field">
        <label class="label" for="result">Result</label>
        <div class="control">
          <textarea
            class="textarea"
            name="result"
            id="result"
            rows="2"
            placeholder="There will be result of cipher"
            v-text="result"
            readonly
          ></textarea>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Form from "../Form.js";
import Cipher from "../Cipher.js";
//import { read } from "fs";
export default {
  data() {
    return {
      form: new Form({
        text: "",
        secret: ""
      }),
      result: ""
    };
  },
  methods: {
    encrypt() {
      this.form
        .submit()
        .then(data => {
          this.result = Cipher.encrypt(data.secret, data.text);
        })
        .catch(() => {
          console.error("did not works");
        });
    },
    decrypt() {
      this.form
        .submit()
        .then(data => {
          this.result = Cipher.decrypt(data.secret, data.text);
        })
        .catch(() => {
          console.error("did not works");
        });
    },
    upload() {
      const file = this.$refs.file.files[0];
      const reader = new FileReader();
      const secret = this.form.secret;

      reader.addEventListener(
        "load",
        function(event) {
          this.form.text = b64DecodeUnicode(reader.result.split(",")[1]);
        }.bind(this)
      );

      reader.readAsDataURL(file);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: calc(100vh - 20rem);
  min-height: 332px;
}
.padded {
  padding-top: 2rem;
}
</style>