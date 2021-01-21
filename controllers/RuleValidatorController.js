class Validator {
  static async validateRule(req, res) {
    return res.status(200).json({
      data: 'ok'
    });
  }
}

export default Validator;
