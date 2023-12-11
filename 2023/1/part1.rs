use std::env;
use std::fs::File;
use std::array::IntoIter;
use std::io::prelude::*;

pub fn read_file_arg() -> IntoIter<&'static str, N> {
    let args: Vec<String> = env::args().collect();
    let data_file: &String = &args[1];
    let mut file = File::open(data_file).unwrap();
    let mut contents = String::new();
    file.read_to_string(&mut contents).unwrap();
    contents.split("\n")
        .filter(|row| row.len() > 0)
        .collect::<Vec<_>>()
        .into_iter()
}

fn find_nums(w: &str) -> (char, char) {
    let mut vec = vec![];
    for chr in w.chars() {
        match chr {
            '1'..='9' => {
                vec.insert(vec.len(), chr);
            },
            _ => (),
        };
    }
    (vec[0], vec[vec.len() - 1])
}

fn main() -> std::io::Result<()> {
    let total = read_file_arg().fold(0, |sum, txt| {
        if txt.len() == 0 { return sum }
        let (x, y) = find_nums(txt);
        let num_str = format!("{}{}", x, y);
        let combined_int = num_str.parse::<i32>().unwrap();
        sum + combined_int
    });
    println!("{}", total);
    Ok(())
}
