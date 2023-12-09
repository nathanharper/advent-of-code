use std::env;
use std::fs::File;
use std::io::prelude::*;

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
    let args: Vec<String> = env::args().collect();
    let data_file: &String = &args[1];
    let mut file = File::open(data_file)?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;
    let rows = contents.split("\n");
    let total = rows.fold(0, |sum, txt| {
        if txt.len() == 0 { return sum }
        let (x, y) = find_nums(txt);
        let num_str = format!("{}{}", x, y);
        let combined_int = num_str.parse::<i32>().unwrap();
        sum + combined_int
    });
    println!("{}", total);
    Ok(())
}
