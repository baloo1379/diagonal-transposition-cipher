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
            :class="{'is-danger': form.errors.has('text')}"
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
      <div class="field is-grouped">
        <div class="control">
          <button type="submit" class="button" :disabled="form.errors.any()">Encrypt</button>
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
const secret = "VCZCNBGNNG";

export default {
  data() {
    return {
      form: new Form({
        text: "",
        secret: secret
      }),
      result: "",
      reader: new FileReader()
    };
  },
  methods: {
    encrypt() {
      this.form
        .submit()
        .then(data => {
          this.result = Cipher.encrypt(data.secret, data.text);
        })
        .catch(errors => {
          console.error("did not works", errors);
        });
      this.form.secret = secret;
    },
    upload() {
      const file = this.$refs.file.files[0];
      this.reader.readAsDataURL(file);
    }
  },
  mounted() {
    this.reader.addEventListener(
      "load",
      function() {
        this.form.text = b64DecodeUnicode(this.reader.result.split(",")[1]);
      }.bind(this)
    );
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